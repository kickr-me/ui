<script>
  import { onMount } from "svelte";

  import { score_red, score_white } from "./stores.js";
  import Score from "./Score.svelte";
  import { connect } from "./socket.js";

  onMount(async () => {
    let ws = connect();

    ws.onmessage = e => {
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
  });

  function resetScore() {
    score_red.set(0);
    score_white.set(0);
  }
</script>

<style>
  .score {
    display: grid;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .score__col {
    display: flex;
    flex-direction: column;
  }

  .score__row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .score__divider {
    font-size: 8rem;
  }

  .score__reset {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  :global(.button) {
    min-height: 70px;
  }
</style>

<div class="score">
  <div class="score__row">
    <div class="score__col">
      <Score bind:score={$score_white} />
    </div>
    <div class="score__col">
      <span class="score__divider">:</span>
    </div>
    <div class="score__col">
      <Score bind:score={$score_red} />
    </div>
  </div>
  <div class="score__row">
    <button class="button score__reset" on:click={resetScore}>Reset</button>
  </div>
</div>
