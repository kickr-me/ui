<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import Match from "./components/Match.svelte";
  import NewGame from "./components/NewGame.svelte";
  import { onMount } from "svelte";
  import { connect } from "./mqtt.js";
  import { game_status } from "./stores.js";

  onMount(async () => {
    connect();
  });
</script>

<div class="flex flex-col h-full justify-between">
  {#if $game_status === 'running'}
    <Match />
  {:else if $game_status === 'stopped'}
    <NewGame />
  {/if}
</div>
