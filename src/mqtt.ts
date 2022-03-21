import Paho from "paho-mqtt";
import { Team } from "./helpers/config";
import {
  game_status,
  goals,
  just_scored,
  players,
  round,
  score_red,
  score_white,
  teams,
  volume,
} from "./stores";

const HOST = "172.30.1.32";
const PORT = 9001;
const CHANNELS = {
  SCORE_RED: "score/red",
  SCORE_WHITE: "score/white",
  SCORE_INCREASE: "score/increase",
  ROUND_CURRENT: "round/current",
  ROUND_GOALS: "round/goals",
  GAME_STATUS: "game/status",
  GAME_START: "game/start",
  GAME_STOP: "game/stop",
  GAME_END: "game/end",
  VOLUME: "sound/volume",
  PLAYERS: "players",
};
const RECONNECTION_TIMEOUT = 3000;
const client: Paho.Client = new Paho.Client(
  HOST,
  PORT,
  "hkick_frontend_" + Math.random().toString(36).substring(2)
);

export function connect() {
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = handleMessages;

  client.connect({
    onSuccess: () => {
      console.log("Connection established");
      subscribeToAllChannels();
    },
  });
}

export function send(
  destination: string,
  message: string,
  retained: boolean = false
) {
  const m = new Paho.Message(message);
  m.destinationName = destination;
  m.retained = retained;
  client.send(m);
}

function subscribeToAllChannels() {
  for (const [_, channel] of Object.entries(CHANNELS)) {
    console.log("Subscribing to channel:", channel);
    client.subscribe(channel, {
      onSuccess: () => {
        console.log("Successfully subscribed to channel:", channel);
      },
    });
  }
}

function onConnectionLost(responseObject: Paho.MQTTError) {
  if (responseObject.errorCode !== 0) {
    console.log("Connection was closed - Reason:", responseObject.errorMessage);
    reconnect();
  }
}

function handleMessages(message: Paho.Message) {
  const channel = message.destinationName;
  let score: number;
  let team: Team;

  switch (channel) {
    case CHANNELS.SCORE_RED:
      score = parseInt(message.payloadString);
      team = Team.Red;
      console.log("[score/red] Message:", score);
      updateScore(team, score);
      break;
    case CHANNELS.SCORE_WHITE:
      score = parseInt(message.payloadString);
      team = Team.White;
      console.log("[score/white] Message:", score);
      updateScore(team, score);
      break;
    case CHANNELS.SCORE_INCREASE:
      console.log("[score/increase] Message:", message.payloadString);
      just_scored.set(true);
      break;
    case CHANNELS.ROUND_CURRENT:
      console.log("[round/current] Message:", message.payloadString);
      round.set(parseInt(message.payloadString));
      break;
    case CHANNELS.ROUND_GOALS:
      console.log("[round/goals] Message:", message.payloadString);
      goals.set(JSON.parse(message.payloadString));
      break;
    case CHANNELS.GAME_STATUS:
      console.log("[game/status] Message:", message.payloadString);
      game_status.set(message.payloadString);
      if (message.payloadString === "stopped") {
        teams.reset();
        just_scored.set(false);
      }
      break;
    case CHANNELS.GAME_START:
      console.log("[game/start] Message:", message.payloadString);
      teams.set(JSON.parse(message.payloadString));
      break;
    case CHANNELS.GAME_STOP:
      console.log("[game/stop] Message:", message.payloadString);
      just_scored.set(false);
      teams.reset();      
      break;
    case CHANNELS.GAME_END:
      console.log("[game/end] Message:", message.payloadString);
      just_scored.set(false);
      teams.reset();
      break;
    case CHANNELS.VOLUME:
      console.log("[sound/volume] Message:", message.payloadString);
      volume.set(message.payloadString);
      break;
    case CHANNELS.PLAYERS:
      players.set(JSON.parse(message.payloadString));
      break;
  }
}

function reconnect() {
  console.log("Reconnecting in 3 seconds...");
  setTimeout(() => {
    connect();
  }, RECONNECTION_TIMEOUT);
}

function updateScore(team: Team, score: number) {
  switch (team) {
    case Team.Red:
      score_red.set(score);
      break;
    case Team.White:
      score_white.set(score);
      break;
  }
}
