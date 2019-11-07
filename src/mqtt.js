import Paho from "paho-mqtt";
import { score_red, score_white } from "./stores.js";

const HOST = "172.30.1.32";
const PORT = 9001;
const CHANNELS = {
  GOALS: "goals",
  GAME: "game"
};
const RECONNECTION_TIMEOUT = 3000;

export function connect() {
  let client = new Paho.Client(HOST, PORT, "clientId");

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = handleMessages;

  client.connect({
    onSuccess: () => {
      console.log("Connection established");
      subscribeToAllChannels(client);
    }
  });
}

function subscribeToAllChannels(client) {
  console.log("Subscribing to channel:", CHANNELS.GOALS);

  for (const [_, channel] of Object.entries(CHANNELS)) {
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

  switch (channel) {
    case CHANNELS.GOALS:
      console.log("[goals] Message:", message.payloadString);
      handleGoals(message.payloadString);
      break;
    case CHANNELS.GAME:
      console.log("[game] Message:", message.payloadString);
      break;
  }
}

function reconnect() {
  console.log("Reconnecting in 3 seconds...");
  setTimeout(() => {
    connect();
  }, RECONNECTION_TIMEOUT);
}

function handleGoals(message) {
  const TEAM = message;

  switch (TEAM) {
    case "red":
      score_red.increment();
      break;
    case "white":
      score_white.increment();
      break;
  }
}
