<script>
  import { score_red, score_white } from "../stores.js";
  import { send } from "../mqtt.js";
  import Score from "./Score.svelte";

  function resetScore() {
    const channel = "score/reset";
    send(channel, "reset");
  }

  function score(e, team) {
    const channel = "score/";
    send(channel + e.detail, team);
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
      <Score score={score_white} on:scoreChange={e => score(e, 'white')} />
    </div>
    <div class="score__col">
      <span class="score__divider">:</span>
    </div>
    <div class="score__col">
      <Score score={score_red} on:scoreChange={e => score(e, 'red')} />
    </div>
  </div>
  <div class="score__row">
    <button class="button score__reset" on:click={resetScore}>New Game</button>
  </div>
</div>
