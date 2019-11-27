<script>
  import Match from "./components/Match.svelte";
  import { onMount } from "svelte";
  import { connect } from "./mqtt.js";

  onMount(async () => {
    connect();
  });
</script>

<div class="flex flex-col h-full justify-between">
  <Match />
</div>
