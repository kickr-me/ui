<svelte:options accessors={true} />

<script lang="ts">
  import { send } from "../mqtt";
  import { volume } from "../stores";

  export let show = false;

  function handleChange() {
    const channel = "sound/volume";
    send(channel, $volume.toString(), true);
  }
</script>

<div class="hidden absolute top-full right-0" class:hidden={!show}>
  <input
    type="range"
    min="0"
    max="100"
    on:change={handleChange}
    bind:value={$volume}
  />
</div>
