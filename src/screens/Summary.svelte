<script lang="ts">
  import BackButton from "../components/BackButton.svelte";
  import Player from "../components/Player/Player.svelte";
  import type { IPlayer } from "../interfaces/player";
  import { send } from "../mqtt";
  import { teams, winner, players } from "../stores";

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

  if ($winner === "a") {
    winningTeam = [$teams.red.attack, $teams.red.defense];
    losingTeam = [$teams.white.attack, $teams.white.defense];
  } else {
    winningTeam = [$teams.white.attack, $teams.white.defense];
    losingTeam = [$teams.red.attack, $teams.red.defense];
  }

  const startGame = () => {
    const channel = "game/start";
    send(channel, JSON.stringify($teams), true);
  };

  const round = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };
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
            <Player
              {player}
              on:click={() => console.log("click")}
              team={"red"}
            />
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
            <Player
              {player}
              on:click={() => console.log("click")}
              team={"white"}
            />
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
  <BackButton />
  <button
    on:click={startGame}
    class="bg-gray-800 hover:bg-gray-700 font-semibold shadow-lg text-xl text-gray-100 py-4 px-6 rounded-full z-20 disabled:bg-gray-400 disabled:shadow-none"
  >
    Rematch
  </button>
</div>
