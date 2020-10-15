<script lang="ts">
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import RoundDisplay from "./RoundDisplay.svelte";
  import Timer from "./Timer.svelte";
  import BackButton from "./BackButton.svelte";
  import GoalHistory from "./GoalHistory.svelte";
</script>

<style>
  .team {
    @apply absolute text-6xl uppercase font-black leading-none;
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

<div class="relative bg-gray-100 flex flex-1 flex-col">
  <div class="fixed flex justify-between px-4 items-center w-full z-20 h-12">
    <div>
      <BackButton />
    </div>
    <div />
    <div class="x-center">
      <Timer />
    </div>
  </div>
  <ScoreDisplay />
  <RoundDisplay />
  <!-- <VolumeSlider /> -->

  <img src="./img/field.svg" class="y-center left-0 z-0" alt="Kicker field" />
  <span class="team team-white text-gray-300">White</span>
  <span class="team team-red text-red-400">Red</span>
</div>

<GoalHistory />
