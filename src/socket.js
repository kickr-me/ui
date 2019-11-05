import { score_red, score_white } from "./stores.js";

const HOST = "127.0.0.1";
const CHANNELS = {
  GOALS: "GoalNotificationsChannel"
};
const RECONNECTION_TIMEOUT = 3000;

export function connect() {
  let socket = new WebSocket(`ws://${HOST}:3000/cable`);

  socket.onopen = e => {
    console.log("[open] Connection established");
    console.log("Subscribing to channel:", CHANNELS.GOALS);
    subscribeToChannel(socket, CHANNELS.GOALS);
  };

  socket.onmessage = e => {
    const DATA = JSON.parse(e.data);
    handleData(DATA);
  };

  socket.onclose = e => {
    console.log("Socket is closed.", e.reason);
    if (!e.wasClean) {
      reconnect();
    }
  };

  socket.onerror = function(error) {
    console.error(`[error] ${error.message}`);
  };
}

function subscribeToChannel(socket, channel) {
  const sub_msg = {
    command: "subscribe",
    identifier: JSON.stringify({
      channel
    })
  };

  socket.send(JSON.stringify(sub_msg));
}

function handleData(data) {
  let channel;
  let type;

  if (data.identifier) {
    channel = JSON.parse(data.identifier).channel;
  }

  if (data.type) {
    type = data.type;
  }

  if (channel) {
    if (type === "confirm_subscription") {
      console.log("Successfully subscribed to channel:", channel);
      return;
    }

    switch (channel) {
      case "GoalNotificationsChannel":
        handleGoals(data.message);
    }
  }
}

function reconnect() {
  console.log("Reconnecting in 3 seconds...");
  setTimeout(() => {
    connect();
  }, RECONNECTION_TIMEOUT);
}

function handleGoals(message) {
  const TEAM = message.team;

  switch (TEAM) {
    case "red":
      score_red.increment();
      break;
    case "white":
      score_white.increment();
      break;
  }
}
