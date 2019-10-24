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

  socket.onmessage = e => {
    const data = JSON.parse(e.data);
    let channel;
    let type;

    if (data.identifier) {
      channel = JSON.parse(data.identifier).channel;
    }

    if (data.type) {
      type = data.type;
    }

    if (channel) {
      switch (channel) {
        case "GoalNotificationsChannel":
          if (type === "confirm_subscription") {
            console.log("Successfully subscribed to channel:", channel);
          }
          if (data.message) {
            console.log(data.message.team);
            switch (data.message.team) {
              case "red":
                $score_red += 1;
                break;
              case "white":
                $score_white += 1;
                break;
            }
          }
      }
    }
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
    console.log(`[error] ${error.message}`);
  };
}
