<script>
  import ScoreDisplay from "./components/ScoreDisplay.svelte";
  import VolumeSlider from "./components/VolumeSlider.svelte";
  import { onMount } from "svelte";
  import { connect } from "./mqtt.js";

  onMount(async () => {
    connect();
  });
</script>

<ScoreDisplay />
<VolumeSlider />
