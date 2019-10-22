<script>
  import { onMount } from "svelte";

  onMount(async () => {
    let socket = new WebSocket("wss://echo.websocket.org");

    socket.onopen = e => {
      console.log("[open] Connection established");
      console.log("Sending to server");
      socket.send("My name is John");
    };

    socket.onmessage = e => {
      console.log(`[message] Data received from server: ${e.data}`, e);
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
  <div class="score-display__score">0</div>
  <span class="score-display__divider">:</span>
  <div class="score-display__score">0</div>
</div>

<!-- {#each photos as photo}
  <figure>
    <img src={photo.thumbnailUrl} alt={photo.title} />
    <figcaption>{photo.title}</figcaption>
  </figure>
{:else}
  <p>loading...</p>
{/each} -->
