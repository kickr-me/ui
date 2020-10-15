<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Writable } from "svelte/store";

  export let score: Writable<number>;
  const dispatch = createEventDispatcher();
</script>

<span
  class="font-semibold text-7xl text-gray-700"
  on:click={() => dispatch('scoreAdapt', 'increase')}>
  {$score}
</span>
