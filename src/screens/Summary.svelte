<script lang="ts">
  import BackButton from "../components/BackButton.svelte";
  import Player from "../components/Player/Player.svelte";
  import type { IPlayer } from "../interfaces/player";
  import { send } from "../mqtt";
  import { teams, winner, players } from "../stores";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  let timeout: NodeJS.Timeout;
  let winningTeam: IPlayer[];
  let losingTeam: IPlayer[];

  $teams.red.attack = $players.find(
    (player) => player.id === $teams.red.attack.id
  );
  $teams.red.defense = $players.find(
    (player) => player.id === $teams.red.defense.id
  );
  $teams.white.attack = $players.find(
    (player) => player.id === $teams.white.attack.id
  );
  $teams.white.defense = $players.find(
    (player) => player.id === $teams.white.defense.id
  );

  if ($winner === "b") {
    winningTeam = [$teams.red.attack, $teams.red.defense];
    losingTeam = [$teams.white.attack, $teams.white.defense];
  } else {
    winningTeam = [$teams.white.attack, $teams.white.defense];
    losingTeam = [$teams.red.attack, $teams.red.defense];
  }

  const startGame = () => {
    const channel = "game/start";
    clearTimeout(timeout);
    send(channel, JSON.stringify($teams), true);
  };

  const round = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const endSummary = () => dispatch("endSummary");

  const gameEndTimer = () => {
    timeout = setTimeout(() => {
      endSummary();
      teams.reset();
    }, 30000);
  };

  onMount(async () => {
    gameEndTimer();
  });

  onDestroy(async () => {
    clearTimeout(timeout);
  });
</script>

<div
  class="h-full flex justify-center items-center bg-gray-100 flex-1 flex-col"
>
  <div class="flex flex-row mb-10">
    <div class="flex flex-col items-center mr-12">
      <span class="text-xl text-green-600 mb-4 font-semibold">Winner</span>
      <div class="grid grid-cols-2 gap-6">
        {#each winningTeam as player}
          <div class="flex flex-col">
            <Player {player} team={"red"} />
            <div class="flex justify-center">
              <span>{round(player.skill.mean)}</span> (<span
                class="text-green-600">+{round(player.skill_diff)}</span
              >)
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-xl text-red-600 mb-4 font-semibold">Loser</span>
      <div class="grid grid-cols-2 gap-6">
        {#each losingTeam as player}
          <div class="flex flex-col">
            <Player {player} team={"white"} />
            <div class="flex justify-center">
              <span>{round(player.skill.mean)}</span> (<span
                class="text-red-600">{round(player.skill_diff)}</span
              >)
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="flex flex-row">
    <button
      on:click={endSummary}
      class="bg-gray-300 hover:bg-gray-200 font-semibold shadow-lg text-xl py-4 px-6 mr-4 rounded-full z-20"
    >
      <svg
        width="22"
        height="20"
        class="fill-current text-gray-800"
        viewBox="0 0 22 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.3644 8.072H6.47085L11.4716 3.28815C12.1886 2.53502 12.1886 1.31797
          11.4716 0.564844C10.7546 -0.188281 9.59181 -0.188281 8.8688
          0.564844L0.54225 8.63835C0.18075 8.9878 0 9.46377 0 9.98795V10.0121C0
          10.5362 0.18075 11.0122 0.54225 11.3617L8.86278 19.4352C9.58578 20.1883
          10.7486 20.1883 11.4656 19.4352C12.1826 18.682 12.1826 17.465 11.4656
          16.7119L6.46483 11.928H19.3583C20.3766 11.928 21.202 11.0664 21.202
          10C21.208 8.9155 20.3826 8.072 19.3644 8.072Z"
        />
      </svg>
    </button>
    <button
      on:click={startGame}
      class="bg-gray-800 hover:bg-gray-700 font-semibold shadow-lg text-xl text-gray-100 py-4 px-6 rounded-full z-20 disabled:bg-gray-400 disabled:shadow-none"
    >
      Rematch
    </button>
  </div>
</div>
