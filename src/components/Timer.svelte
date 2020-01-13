<script>
  import { onMount } from "svelte";
  import { Stopwatch } from "../helpers/stopwatch.js";

  const interval = 1000;
  let timer;
  let stopwatch = new Stopwatch();

  function startTimer() {
    timer = setInterval(() => {
      stopwatch.seconds += 1;

      if (stopwatch.seconds === 60) {
        stopwatch.minutes += 1;
        stopwatch.seconds = 0;
      }
    }, interval);
  }

  export function resetTimer() {
    stopwatch.seconds = 0;
    stopwatch.minutes = 0;
    clearInterval(timer);
    startTimer();
  }

  onMount(() => {
    startTimer();
  });
</script>

<span class="px-2 text-gray-600 bg-gray-100 text-base font-medium">
  {stopwatch}
</span>
