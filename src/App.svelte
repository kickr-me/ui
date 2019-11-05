<script>
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import { onMount } from "svelte";
  import { connect } from "./socket.js";

  onMount(async () => {
    connect();
  });
</script>

<ScoreDisplay />
