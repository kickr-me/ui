<script>
  import PlayerAvatar from "./PlayerAvatar.svelte";

  export let player;
  export let selected = false;
  export let disabled = false;
</script>

<div
  class="player flex flex-col items-center transform {!disabled
    ? 'active:scale-95 cursor-pointer'
    : ''}"
  class:disabled
  on:click
>
  <PlayerAvatar avatarUrl={player.avatar_url} {selected} />
  <span class="block text-center text-gray-700 font-semibold"
    >{player.username}</span
  >
</div>

<style>
  .disabled {
    @apply filter grayscale opacity-50;
  }
</style>
