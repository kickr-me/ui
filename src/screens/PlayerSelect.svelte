<script lang="ts">
  import Player from "../components/Player/Player.svelte";
  import { send } from "../mqtt";

  const maxPlayerCount = 4;

  let selectedPlayers: number[] = new Array(maxPlayerCount);
  selectedPlayers.fill(undefined);
  Object.seal(selectedPlayers);

  const addOrRemovePlayer = (id: number) => {
    const exists = selectedPlayers.includes(id);

    if (exists) {
      const index = selectedPlayers.indexOf(id);
      selectedPlayers[index] = undefined;
    } else {
      const index = selectedPlayers.indexOf(undefined);
      if (index !== -1) {
        selectedPlayers[index] = id;
      }
    }
  };

  function startGame() {
    const channel = "game/start";
    send(channel, "");
  }

  //https://dashboard.kickr.me/players.json/
  const fetchPlayers = (async () => {
    const response = await fetch(`https://dashboard.kickr.me/players.json`);
    return await response.json();
  })();

  $: selectedPlayerCount = selectedPlayers.filter(
    (v) => v !== undefined
  ).length;
</script>

<div class="relative bg-gray-100 flex flex-1 flex-col h-full">
  <div class="flex justify-between px-4 items-center w-full z-20 h-20">
    <div class="x-center text-gray-700 font-semibold text-xl">
      Select {maxPlayerCount - selectedPlayerCount} more players
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
            on:click={() => addOrRemovePlayer(player.id)}
            selected={selectedPlayers.includes(player.id)}
            disabled={selectedPlayerCount === maxPlayerCount &&
              !selectedPlayers.includes(player.id)}
          />
        {/each}
      {:catch error}
        <p>Can't load players!</p>
      {/await}
    </div>
  </div>
  <div
    class="fixed flex justify-center items-start px-4 w-full z-20 h-20 bottom-0"
  >
    <button
      on:click={startGame}
      class="bg-gray-800 hover:bg-gray-700 font-semibold shadow-lg text-xl
      text-gray-100 py-4 px-6 rounded-full z-20"
    >
      Start game
    </button>
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
