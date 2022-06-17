<script lang="ts">
  import ScoreDisplay from "../components/ScoreDisplay.svelte";
  import RoundDisplay from "../components/RoundDisplay.svelte";
  import Timer from "../components/Timer.svelte";
  import BackButton from "../components/BackButton.svelte";
  import GoalHistory from "../components/GoalHistory.svelte";
  import VolumeButton from "../components/VolumeButton.svelte";
  import { round, teams } from "../stores";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const playerName = (playerName: string) =>
    `<span class="text-gray-500">${playerName}</span>`;

  const swapTeams = () => {
    const tempTeam = $teams.red;
    $teams.red = $teams.white;
    $teams.white = tempTeam;
  };

  const endSummary = () => dispatch("endSummary");

  // Swap teams once before the match so that they get swapped
  // again when the round starts and are in the correct order
  swapTeams();
  $: $round, swapTeams();
</script>

<div class="relative bg-gray-100 flex flex-1 flex-col">
  <div class="fixed flex justify-between px-4 items-center w-full z-20 h-12">
    <div>
      <BackButton on:stopGame={endSummary} />
    </div>
    <div />
    <div class="x-center">
      <Timer />
    </div>
    <div>
      <VolumeButton />
    </div>
  </div>
  <ScoreDisplay />
  <RoundDisplay />

  <img src="./img/field.svg" class="y-center left-0 z-0" alt="Kicker field" />
  <span class="team team-white text-gray-300">White</span>
  <span class="team team-red text-red-400">Red</span>
  <div class="flex justify-between px-4 pb-4 text-sm">
    {#each Object.keys($teams) as team, i}
      <div class={`flex flex-col ${i === 1 ? "text-right" : ""}`}>
        {@html playerName($teams[team].attack?.username)}
        {@html playerName($teams[team].defense?.username)}
      </div>
    {/each}
  </div>
</div>

<GoalHistory />

<style>
  .team {
    @apply absolute;
    @apply text-6xl;
    @apply uppercase;
    @apply font-black;
    @apply leading-none;
  }

  .team-red {
    top: 50%;
    right: -25px;
    transform: translateY(-50%) rotate(-90deg);
  }

  .team-white {
    top: 50%;
    left: -70px;
    transform: translateY(-50%) rotate(90deg);
  }
</style>
