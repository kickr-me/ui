<script>
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import VolumeSlider from "./VolumeSlider.svelte";
  import { onMount } from "svelte";
  import { connect } from "./mqtt.js";

  onMount(async () => {
    connect();
  });
</script>

<ScoreDisplay />
<VolumeSlider />
