const channel = "GoalNotificationsChannel";
const host = "127.0.0.1";
const sub_msg = {
  command: "subscribe",
  identifier: JSON.stringify({
    channel
  })
};

export function connect() {
  let socket = new WebSocket(`ws://${host}:3000/cable`);

  socket.onopen = e => {
    console.log("[open] Connection established");
    console.log("Subscribing to channel:", channel);
    socket.send(JSON.stringify(sub_msg));
  };

  socket.onclose = e => {
    console.log(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );
    setTimeout(() => {
      connect();
    }, 1000);
  };

  socket.onerror = function(error) {
    console.error(`[error] ${error.message}`);
  };

  return socket;
}
