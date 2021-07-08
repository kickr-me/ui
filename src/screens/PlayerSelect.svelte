<script lang="ts">
  import Player from "../components/Player/Player.svelte";
  import Team from "../components/Team.svelte";
  import { send } from "../mqtt";
  import { players, teams } from "../stores";
  import type { IPlayer } from "../interfaces/player";

  const maxPlayerCount = 4;

  const handlePlayerClick = (player: IPlayer) => {
    addOrRemovePlayer(player);
  };

  const isPlayerSelected = (player: IPlayer) => {
    return (
      Object.values($teams.red).includes(player) ||
      Object.values($teams.white).includes(player)
    );
  };

  const addOrRemovePlayer = (player: IPlayer) => {
    for (const team in $teams) {
      if (Object.prototype.hasOwnProperty.call($teams, team)) {
        if (Object.values($teams[team]).includes(player)) {
          // remove player
          const key = Object.keys($teams[team]).find(
            (key) => $teams[team][key] === player
          );
          $teams[team][key] = undefined;
          break;
        } else if (Object.values($teams[team]).includes(undefined)) {
          // add player
          const key = Object.keys($teams[team]).find(
            (key) => $teams[team][key] === undefined
          );
          $teams[team][key] = player;
          break;
        }
      }
    }
  };

  const startGame = () => {
    const channel = "game/start";
    send(channel, JSON.stringify($teams));
  };

  $: selectedPlayerCount = [
    ...Object.values($teams.red),
    ...Object.values($teams.white),
  ].filter((v) => v !== undefined).length;
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
  <div class="h-full px-16 pt-4 overflow-scroll">
    <div class="grid grid-cols-5 gap-8 pb-32">
      {#each $players as player}
        <Player
          {player}
          on:click={() => handlePlayerClick(player)}
          disabled={selectedPlayerCount === maxPlayerCount &&
            !isPlayerSelected(player)}
          team={"red"}
        />
      {/each}
    </div>
  </div>
  <div
    class="fixed flex justify-between items-start px-4 w-full z-20 h-20 bottom-0"
  >
    <Team team={"red"} />
    <button
      on:click={startGame}
      class="bg-gray-800 hover:bg-gray-700 font-semibold shadow-lg text-xl text-gray-100 py-4 px-6 rounded-full z-20 disabled:bg-gray-400 disabled:shadow-none"
      disabled={remainingSlots !== 0}
    >
      Start game
    </button>
    <Team team={"white"} />
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
</style>
