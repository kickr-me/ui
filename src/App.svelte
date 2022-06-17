<script lang="ts">
  import Match from "./screens/Match.svelte";
  import NewGame from "./screens/NewGame.svelte";
  import PlayerSelect from "./screens/PlayerSelect.svelte";
  import { onMount } from "svelte";
  import { connect } from "./mqtt";
  import { game_status } from "./stores";
  import getQueryParams from "./helpers/query_params";
  import SpotifyToast from "./components/SpotifyToast.svelte";

  const query = getQueryParams(document.location.search);

  onMount(async () => {
    connect();
  });
</script>

<div class="flex flex-col h-full justify-between" class:kiosk={query.kiosk}>
  {#if $game_status === "running"}
    <Match />
  {:else if $game_status === "stopped"}
    <!-- <NewGame /> -->
    <PlayerSelect />
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
