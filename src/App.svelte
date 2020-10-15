<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import Match from "./components/Match.svelte";
  import NewGame from "./components/NewGame.svelte";
  import { onMount } from "svelte";
  import { connect } from "./mqtt.ts";
  import { game_status } from "./stores.ts";
  import getQueryParams from "./helpers/query_params.ts";

  let query = getQueryParams(document.location.search);

  onMount(async () => {
    connect();
  });
</script>

<div class="flex flex-col h-full justify-between" class:kiosk={query.kiosk}>
  {#if $game_status === 'running'}
    <Match />
  {:else if $game_status === 'stopped'}
    <NewGame />
  {/if}
</div>
