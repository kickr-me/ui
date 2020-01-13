<script>
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import VolumeSlider from "./VolumeSlider.svelte";
  import MatchTimer from "./MatchTimer.svelte";
</script>

<style>
  .team {
    @apply absolute text-6xl uppercase font-black;
  }
  .team-red {
    top: 50%;
    left: -15px;
    transform: translateY(-50%) rotate(90deg);
  }

  .team-white {
    top: 50%;
    right: -60px;
    transform: translateY(-50%) rotate(-90deg);
  }
</style>

<div class="relative bg-gray-100 flex flex-1 flex-col">
  <div class="fixed flex justify-center items-center w-full z-10 h-12">
    <MatchTimer />
  </div>
  <ScoreDisplay />
  <!-- <VolumeSlider /> -->

  <img
    src="./img/field.svg"
    class="absolute top-0 left-0 z-0"
    alt="Kicker field" />
  <span class="team team-red text-red-400">Red</span>
  <span class="team team-white text-gray-300">White</span>
</div>

<div class="h-20 bg-gray-100 shadow-2xl z-50" />
