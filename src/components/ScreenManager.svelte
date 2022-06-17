<script lang="ts">
  import { onDestroy } from "svelte";
  import Match from "../screens/Match.svelte";
  import NewGame from "../screens/NewGame.svelte";
  import Summary from "../screens/Summary.svelte";
  import PlayerSelect from "../screens/PlayerSelect.svelte";
  import { game_end, game_status, teams } from "../stores";
  import { send } from "../mqtt";

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

  const handleEndSummary = () => {
    console.log("HandleEndSummary");
    const channel = "game/stop";
    send(channel, "");
    showSummary = false;
    clearTimeout(timeout);
  };

  onDestroy(async () => {
    clearTimeout(timeout);
  });

  $: {
    if (prevGameStatus === "running" && $game_end) {
      gameEndTimer();
    }
    prevGameStatus = $game_status;
  }
</script>

{#if $game_status === "running"}
  <Match on:endSummary={handleEndSummary} />
{:else if $game_status === "stopped" && !showSummary}
  <!-- <NewGame /> -->
  <PlayerSelect />
{:else if $game_status === "stopped" && showSummary}
  <Summary on:endSummary={handleEndSummary} />
{/if}
