<script>
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import VolumeSlider from "./VolumeSlider.svelte";
  import MatchTimer from "./MatchTimer.svelte";
</script>

<div class="bg-gray-100 flex flex-1 flex-col">
  <div class="fixed flex justify-center items-center w-full z-10 h-12">
    <MatchTimer />
  </div>
  <ScoreDisplay />
  <!-- <VolumeSlider /> -->

  <img
    src="./img/field.svg"
    class="absolute top-0 left-0 z-0"
    alt="Kicker field" />
</div>

<div class="h-20 bg-gray-100 shadow-2xl" />
