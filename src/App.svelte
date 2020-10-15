<script lang="ts">
  import Match from "./components/Match.svelte";
  import NewGame from "./components/NewGame.svelte";
  import { onMount } from "svelte";
  import { connect } from "./mqtt";
  import { game_status } from "./stores";
  import getQueryParams from "./helpers/query_params";

  let query = getQueryParams(document.location.search);

  onMount(async () => {
    connect();
  });
</script>

<style global>
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>

<div class="flex flex-col h-full justify-between" class:kiosk={query.kiosk}>
  {#if $game_status === 'running'}
    <Match />
  {:else if $game_status === 'stopped'}
    <NewGame />
  {/if}
</div>
