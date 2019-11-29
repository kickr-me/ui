<script>
  import { createEventDispatcher } from "svelte";

  export let score;
  const dispatch = createEventDispatcher();
</script>

<span
  class="font-semibold text-7xl text-gray-700"
  on:click={() => dispatch('scoreAdapt', 'increase')}>
  {$score}
</span>
