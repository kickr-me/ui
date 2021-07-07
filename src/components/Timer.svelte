<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Stopwatch } from "../helpers/stopwatch";

  const interval = 1000;
  let timer: NodeJS.Timeout;
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

  export function updateTimer(newTime: number) {
    const minutes = Math.floor(newTime / 60);
    const seconds = Math.round(newTime % 60);

    stopwatch.seconds = seconds;
    stopwatch.minutes = minutes;
  }

  onMount(() => {
    startTimer();
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<span class="py-1 px-2 text-gray-600 bg-gray-100 text-base font-medium">
  {stopwatch}
</span>
