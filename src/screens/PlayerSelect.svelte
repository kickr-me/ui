<script lang="ts">
  import Player from "../components/Player/Player.svelte";
  import Team from "../components/Team.svelte";
  import { send } from "../mqtt";
  import { selected_players, teams } from "../stores";
  import type { IPlayer } from "../interfaces/player";

  const maxPlayerCount = 4;
  $selected_players.fill(undefined);

  const addOrRemovePlayer = (player: IPlayer) => {
    const exists = $selected_players.includes(player);

    if (exists) {
      const index = $selected_players.indexOf(player);
      $selected_players[index] = undefined;
    } else {
      const index = $selected_players.indexOf(undefined);
      if (index !== -1) {
        $selected_players[index] = player;
      }
    }
  };

  const startGame = () => {
    const channel = "game/start";
    $teams.red.attack = $selected_players[0];
    $teams.red.defense = $selected_players[1];
    $teams.white.attack = $selected_players[2];
    $teams.white.defense = $selected_players[3];
    send(channel, JSON.stringify($teams));
  };

  //https://dashboard.kickr.me/players.json/
  const fetchPlayers = (async (): Promise<IPlayer[]> => {
    const response = await fetch(`https://dashboard.kickr.me/players.json`);
    return await response.json();
  })();

  $: selectedPlayerCount = $selected_players.filter(
    (v) => v !== undefined
  ).length;
  $: remainingSlots = maxPlayerCount - selectedPlayerCount;
</script>

<div class="relative bg-gray-100 flex flex-1 flex-col h-full">
  <div class="flex justify-between px-4 items-center w-full z-20 h-20">
    <div class="x-center text-gray-700 font-semibold text-xl">
      {#if remainingSlots !== 0}
        Select {remainingSlots} more players
      {:else}
        Let's go!
      {/if}
    </div>
  </div>
  <div class="player-grid px-16 pt-4 overflow-scroll">
    <div class="grid grid-cols-5 gap-8 pb-32">
      {#await fetchPlayers}
        <p>Loading players...</p>
      {:then players}
        {#each players as player}
          <Player
            {player}
            on:click={() => addOrRemovePlayer(player)}
            selected={$selected_players.includes(player)}
            disabled={selectedPlayerCount === maxPlayerCount &&
              !$selected_players.includes(player)}
            team={0}
          />
        {/each}
      {:catch error}
        <p>Can't load players!</p>
      {/await}
    </div>
  </div>
  <div
    class="fixed flex justify-between items-start px-4 w-full z-20 h-20 bottom-0"
  >
    <Team team={0} />
    <button
      on:click={startGame}
      class="bg-gray-800 hover:bg-gray-700 font-semibold shadow-lg text-xl text-gray-100 py-4 px-6 rounded-full z-20 disabled:bg-gray-400 disabled:shadow-none"
      disabled={selectedPlayerCount !== maxPlayerCount}
    >
      Start game
    </button>
    <Team team={1} />
    <div class="bottom-bar-gradient absolute w-full h-40 bottom-0 z-10" />
  </div>
</div>

<style>
  .bottom-bar-gradient {
    pointer-events: none;
    background: linear-gradient(
      0deg,
      #f7fafc 0%,
      #f7fafc 20%,
      rgba(247, 250, 252, 0.713542) 40%,
      rgba(247, 250, 252, 0) 80%
    );
  }

  .player-grid {
    height: 100%;
  }
</style>
