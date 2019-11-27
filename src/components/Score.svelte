<script>
  import { createEventDispatcher } from "svelte";

  export let score;
  const dispatch = createEventDispatcher();

  const increaseEvent = {
    team: ""
  };
</script>

<style>

</style>

<span
  class="font-semibold text-7xl text-gray-700"
  on:click={() => dispatch('scoreChange', 'increase')}>
  {$score}
</span>
