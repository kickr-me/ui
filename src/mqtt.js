import Paho from "paho-mqtt";
import { score_red, score_white } from "./stores.js";

const HOST = "172.30.1.32";
const PORT = 9001;
const CHANNELS = {
  GOALS: "goals"
};
const RECONNECTION_TIMEOUT = 3000;

export function connect() {
  let client = new Paho.Client(HOST, PORT, "clientId");

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = handleMessages;

  client.connect({
    onSuccess: () => {
      console.log("Connection established");
      console.log("Subscribing to channel:", CHANNELS.GOALS);
      client.subscribe(CHANNELS.GOALS, {
        onSuccess: () => {
          console.log("Successfully subscribed to channel:", CHANNELS.GOALS);
        }
      });
    }
  });
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Connection was closed - Reason:", responseObject.errorMessage);
    reconnect();
  }
}

function handleMessages(message) {
  console.log("Message:" + message.destinationName);
  const channel = message.destinationName;

  switch (channel) {
    case CHANNELS.GOALS:
      handleGoals(message.payloadString);
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
