<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();
  let time_in_seconds = 10;
  let timer = time_in_seconds * 1000;

  onMount(() => {
    const interval = setInterval(() => {
      timer -= 1000;

      if (timer === 0) {
        dispatch("timerEnd", "");
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<style>
  .undo {
    bottom: 2rem;
  }

  .svg-line {
    position: absolute;
    top: -2px;
    left: -2px;
    stroke-dasharray: 200;
    stroke-dashoffset: 0;
    animation: dash 10s linear forwards;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 200;
    }
  }
</style>

<button
  class="undo absolute bg-gray-300 hover:bg-gray-400 font-semibold shadow-lg
  text-lg text-gray-700 py-2 px-5 rounded-full"
  transition:fade={{ duration: 150 }}>
  Undo
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="110%"
    height="110%"
    class="svg-line"
    viewBox="-5 -5 84 40">
    <rect
      width="90%"
      height="90%"
      x="-3"
      y="-3"
      rx="20"
      stroke="#2D3748"
      fill="none"
      stroke-width="3" />
  </svg>
</button>
