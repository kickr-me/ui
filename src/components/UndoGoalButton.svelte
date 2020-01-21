<script>
  import { send } from "../mqtt.js";
  import { scale } from "svelte/transition";
  import { quintOut, linear } from "svelte/easing";
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();
  let timer;
  let ghostEl;

  export function resetTimer() {
    clearTimer();
    restartAnimation();
    startTimer();
  }

  export function clearTimer() {
    clearInterval(timer);
  }

  function restartAnimation() {
    ghostEl.classList.add("notransition");
    ghostEl.classList.remove("ghost--animate");
    void ghostEl.offsetWidth;
    ghostEl.classList.remove("notransition");
  }

  function startTimer() {
    let duration = 10;
    ghostEl.classList.add("ghost--animate");
    timer = setInterval(() => {
      duration = duration - 1;
      if (duration === 0) {
        clearTimer();
        dispatch("timerEnd", "");
      }
    }, 1000);
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

  .button {
    height: 60px;
    width: 150px;
    --clip: inset(0 0 0 0);
  }

  .ghost {
    @apply bg-gray-500 absolute rounded-full;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    clip-path: var(--clip);
    opacity: 0.3;
    z-index: 1;
    transition: clip-path 10s linear;
  }

  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  :global(.kiosk) .undo-group {
    display: none;
  }

  :global(.ghost--animate) {
    --clip: inset(0 100% 0 0);
  }

  :global(.notransition) {
    transition: none !important;
  }
</style>

<div
  class="undo-group absolute"
  transition:scale|local={{ duration: 500, opacity: 0, start: 0.8, easing: quintOut }}>
  <button
    on:click={undoLastScore}
    class="button relative bg-gray-300 hover:bg-gray-400 font-semibold shadow-lg
    text-lg text-gray-700 rounded-full">
    <span class="text">Undo</span>
    <span bind:this={ghostEl} class="ghost" />
  </button>
</div>
