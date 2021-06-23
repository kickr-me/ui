<script lang="ts">
  import ScoreDisplay from "../components/ScoreDisplay.svelte";
  import RoundDisplay from "../components/RoundDisplay.svelte";
  import Timer from "../components/Timer.svelte";
  import BackButton from "../components/BackButton.svelte";
  import GoalHistory from "../components/GoalHistory.svelte";
  import VolumeButton from "../components/VolumeButton.svelte";
</script>

<div class="relative bg-gray-100 flex flex-1 flex-col">
  <div class="fixed flex justify-between px-4 items-center w-full z-20 h-12">
    <div>
      <BackButton />
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
