<script lang="ts">
  import { onMount } from "svelte";
  import { connect } from "./mqtt";
  import getQueryParams from "./helpers/query_params";
  import SpotifyToast from "./components/SpotifyToast.svelte";
  import ScreenManager from "./components/ScreenManager.svelte";

  const query = getQueryParams(document.location.search);

  onMount(async () => {
    connect();
  });
</script>

<div class="flex flex-col h-full justify-between" class:kiosk={query.kiosk}>
  <ScreenManager />

  <SpotifyToast />
</div>

<style global>
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>
