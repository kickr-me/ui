<script>
  import { createEventDispatcher } from "svelte";

  export let score;
  const dispatch = createEventDispatcher();

  const increaseEvent = {
    team: ""
  };
</script>

<style>
  .score__value {
    font-size: 15rem;
    line-height: 1;
  }
</style>

<button class="button" on:click={() => dispatch('scoreChange', 'increase')}>
  +
</button>
<span class="score__value">{$score}</span>
<button class="button" on:click={() => dispatch('scoreChange', 'decrease')}>
  -
</button>
