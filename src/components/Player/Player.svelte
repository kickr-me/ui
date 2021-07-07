<script lang="ts">
  import type { IPlayer } from "../../interfaces/player";
  import PlayerAvatar from "./PlayerAvatar.svelte";

  export let player: IPlayer;
  export let selected = false;
  export let disabled = false;
  export let team: number;
</script>

<div
  class="player flex flex-col items-center transform {!disabled
    ? 'active:scale-95 cursor-pointer'
    : ''}"
  class:disabled
  on:click
>
  <PlayerAvatar avatarUrl={player.avatar_url} {selected} {team} />
  <span class="block text-center text-gray-700 font-semibold"
    >{player.username}</span
  >
</div>

<style>
  .disabled {
    @apply filter grayscale opacity-50;
  }
</style>
