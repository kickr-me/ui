import Paho from "paho-mqtt";
import {
  game_running,
  just_scored,
  score_red,
  score_white,
  goals,
  round
} from "./stores.js";

const HOST = "172.30.1.32";
const PORT = 9001;
const CHANNELS = {
  SCORE_RED: "score/red",
  SCORE_WHITE: "score/white",
  SCORE_INCREASE: "score/increase",
  ROUND_CURRENT: "round/current",
  ROUND_GOALS: "round/goals",
  GAME_END: "game/end"
};
const RECONNECTION_TIMEOUT = 3000;
const client = new Paho.Client(
  HOST,
  PORT,
  "hkick_frontend_" +
    Math.random()
      .toString(36)
      .substring(2)
);

export function connect() {
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = handleMessages;

  client.connect({
    onSuccess: () => {
      console.log("Connection established");
      subscribeToAllChannels();
    }
  });
}

export function send(destination, message) {
  message = new Paho.Message(message);
  message.destinationName = destination;
  client.send(message);
}

function subscribeToAllChannels() {
  for (const [_, channel] of Object.entries(CHANNELS)) {
    console.log("Subscribing to channel:", channel);
    client.subscribe(channel, {
      onSuccess: () => {
        console.log("Successfully subscribed to channel:", channel);
      }
    });
  }
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Connection was closed - Reason:", responseObject.errorMessage);
    reconnect();
  }
}

function handleMessages(message) {
  const channel = message.destinationName;
  let score;
  let team;

  switch (channel) {
    case CHANNELS.SCORE_RED:
      score = parseInt(message.payloadString);
      team = "red";

      console.log("[score/red] Message:", score);
      updateScore(team, score);
      break;
    case CHANNELS.SCORE_WHITE:
      score = parseInt(message.payloadString);
      team = "white";

      console.log("[score/white] Message:", score);
      updateScore(team, score);
      break;
    case CHANNELS.SCORE_INCREASE:
      console.log("[score/increase] Message:", message.payloadString);
      just_scored.set(true);
      break;
    case CHANNELS.ROUND_CURRENT:
      console.log("[round/current] Message:", message.payloadString);
      round.set(message.payloadString);
      break;
    case CHANNELS.ROUND_GOALS:
      console.log("[round/goals] Message:", message.payloadString);
      goals.set(JSON.parse(message.payloadString));
      break;
    case CHANNELS.GAME_END:
      console.log("[game/end] Message:", message.payloadString);
      just_scored.set(false);
      game_running.set(false);
      break;
  }
}

function reconnect() {
  console.log("Reconnecting in 3 seconds...");
  setTimeout(() => {
    connect();
  }, RECONNECTION_TIMEOUT);
}

function updateScore(team, score) {
  switch (team) {
    case "red":
      score_red.set(score);
      break;
    case "white":
      score_white.set(score);
      break;
  }
}
