<script>
  import { onMount } from "svelte";

  const channel = "GoalNotificationsChannel";
  const host = "127.0.0.1";
  const sub_msg = {
    command: "subscribe",
    identifier: JSON.stringify({
      channel
    })
  };

  const score = {
    red: 0,
    white: 0
  };

  onMount(async () => {
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
                  score.red += 1;
                  break;
                case "white":
                  score.white += 1;
                  break;
              }
            }
        }
      }
    };

    socket.onclose = e => {
      if (e.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`
        );
      } else {
        console.log("[close] Connection died");
      }
    };

    socket.onerror = function(error) {
      console.log(`[error] ${error.message}`);
    };
  });
</script>

<style>
  .score-display {
    display: flex;
    width: 100%;
    height: 80%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .score-display__score {
    font-size: 18rem;
  }

  .score-display__divider {
    font-size: 8rem;
  }
</style>

<div class="score-display">
  <div class="score-display__score">{score.red}</div>
  <span class="score-display__divider">:</span>
  <div class="score-display__score">{score.white}</div>
</div>
