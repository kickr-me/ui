<script>
  import { goals } from "../stores.ts";
  import GoalBadge from "./GoalBadge.svelte";
  import { afterUpdate } from "svelte";

  let lineWidth;
  let timeline;

  afterUpdate(() => {
    lineWidth = $goals.length * 50;
    timeline.style.width = `${lineWidth}px`;
  });
</script>

<style>
  .goal-history {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
  }

  .timeline {
    bottom: 30px;
  }
</style>

<div class="goal-history relative px-3 h-20 bg-gray-100 shadow-2xl z-50">
  {#each $goals as goal}
    <GoalBadge team={goal.Team} time={goal.Time} />
  {/each}
  <span
    bind:this={timeline}
    class="timeline absolute h-1 bg-gray-300 z-10"
    style="width: {{ lineWidth }}" />
</div>
