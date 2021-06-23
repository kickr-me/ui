<svelte:options accessors={true} />

<script lang="ts">
  import { send } from "../mqtt";
  import { volume } from "../stores";
  import { fade } from "svelte/transition";

  function handleChange() {
    const channel = "sound/volume";
    send(channel, $volume.toString(), true);
  }
</script>

<div
  class=" absolute top-full w-full right-0 px-4"
  transition:fade|local={{
    duration: 300,
  }}
>
  <input
    type="range"
    min="0"
    max="100"
    class="w-full"
    on:change={handleChange}
    bind:value={$volume}
  />
</div>
