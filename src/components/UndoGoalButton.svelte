<script>
  import { send } from "../mqtt.js";
  import { scale, draw, fade } from "svelte/transition";
  import { quintOut, linear } from "svelte/easing";
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();
  const duration = 10000;
  let timer;
  let runAnimation = false;

  export function resetTimer() {
    clearTimer();
    setTimeout(() => {
      startTimer();
    }, 100);
  }

  export function clearTimer() {
    clearTimeout(timer);
    runAnimation = false;
  }

  function startTimer() {
    runAnimation = true;

    timer = setTimeout(() => {
      dispatch("timerEnd", "");
    }, duration);
  }

  function undoLastScore(e) {
    const channel = "score/undo";
    send(channel, "1");
    dispatch("timerEnd", "");
  }

  onMount(() => {
    startTimer();
  });

  onDestroy(() => {
    clearTimer();
  });
</script>

<style>
  .undo-group {
    bottom: 2rem;
  }

  .undo-button {
    padding: 15px 46px;
  }
</style>

<div
  class="undo-group absolute"
  transition:scale|local={{ duration: 500, opacity: 0, start: 0.8, easing: quintOut }}>
  <button
    on:click={undoLastScore}
    class="undo-button bg-gray-300 hover:bg-gray-400 font-semibold shadow-lg
    text-lg text-gray-700 rounded-full">
    Undo
  </button>
  <svg
    class="absolute top-0 left-0 pointer-events-none"
    width="139"
    height="58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    {#if !runAnimation}
      <path
        out:draw|local={{ duration: duration - 50, easing: linear }}
        d="M29 1.5C13.812 1.5 1.5 13.812 1.5 29S13.812 56.5 29 56.5h81c15.188 0
        27.5-12.312 27.5-27.5S125.188 1.5 110 1.5H29z"
        stroke="#2D3748"
        stroke-width="3"
        stroke-miterlimit="16" />
    {/if}
  </svg>
</div>
