<script>
  import { round, goals } from "../stores.js";
  import Timer from "./Timer.svelte";

  let roundTimer;

  function resetRoundTimer() {
    if (roundTimer) {
      roundTimer.resetTimer();
    }
  }

  function updateTimer() {
    let lastGoal = $goals.slice(-1)[0];

    if (roundTimer && lastGoal) {
      roundTimer.updateTimer(lastGoal.Time);
    }
  }

  $: $round, resetRoundTimer();
  $: $goals, updateTimer();
</script>

<style>
  .round-display {
    display: grid;
    grid-row-gap: 35px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="round-display absolute text-gray-600 text-lg text-center">
  <span on:change>Round {$round}</span>
  <span>
    <Timer bind:this={roundTimer} />
  </span>
</div>
