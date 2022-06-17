<script lang="ts">
  import Match from "./screens/Match.svelte";
  import NewGame from "./screens/NewGame.svelte";
  import Summary from "./screens/Summary.svelte";
  import PlayerSelect from "./screens/PlayerSelect.svelte";
  import { onDestroy, onMount } from "svelte";
  import { connect } from "./mqtt";
  import { game_status, teams } from "./stores";
  import getQueryParams from "./helpers/query_params";
  import SpotifyToast from "./components/SpotifyToast.svelte";

  const query = getQueryParams(document.location.search);

  let showSummary = false;
  let timeout: NodeJS.Timeout;
  let prevGameStatus: string;

  const gameEndTimer = () => {
    showSummary = true;
    timeout = setTimeout(() => {
      showSummary = false;
      teams.reset();
    }, 30000);
  };

  onMount(async () => {
    connect();
  });

  onDestroy(async () => {
    clearTimeout(timeout);
  });

  $: {
    if (prevGameStatus === "running" && $game_status === "stopped") {
      gameEndTimer();
    }
    prevGameStatus = $game_status;
  }
</script>

<div class="flex flex-col h-full justify-between" class:kiosk={query.kiosk}>
  {#if $game_status === "running"}
    <Match />
  {:else if $game_status === "stopped" && !showSummary}
    <!-- <NewGame /> -->
    <PlayerSelect />
  {:else if $game_status === "stopped" && showSummary}
    <Summary />
  {/if}

  <SpotifyToast />
</div>

<style global>
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>
