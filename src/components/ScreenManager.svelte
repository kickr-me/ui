<script lang="ts">
  import Match from "../screens/Match.svelte";
  // import NewGame from "../screens/NewGame.svelte";
  import Summary from "../screens/Summary.svelte";
  import PlayerSelect from "../screens/PlayerSelect.svelte";
  import { game_end, game_status } from "../stores";
  import { send } from "../mqtt";

  let showSummary = false;
  let prevGameStatus: string;

  const handleEndSummary = () => {
    const channel = "game/stop";
    send(channel, "");
    showSummary = false;
  };

  $: {
    if (prevGameStatus === "running" && $game_end) {
      showSummary = true;
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
