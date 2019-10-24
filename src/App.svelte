<script>
  import { onMount } from "svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import { score_red, score_white } from "./stores.js";
  import { connect } from "./socket.js";

  onMount(async () => {
    connect();
  });
</script>

<ScoreDisplay />
