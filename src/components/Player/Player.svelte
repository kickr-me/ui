<script lang="ts">
  import type { IPlayer } from "../../interfaces/player";
  import { teams } from "../../stores";
  import PlayerAvatar from "./PlayerAvatar.svelte";

  export let player: IPlayer;
  export let disabled = false;
  export let team: string;

  $: selected =
    Object.values($teams.red).includes(player) ||
    Object.values($teams.white).includes(player);
</script>

<div
  class="player flex flex-col items-center transform {!disabled
    ? 'active:scale-95 cursor-pointer'
    : 'filter grayscale opacity-50'}"
  class:disabled
  on:click
>
  <PlayerAvatar avatarUrl={player.avatar_url} {selected} {team} />
  <span class="block text-center text-gray-700 font-semibold"
    >{player.username} {player.vip ? "👑" : ""}</span
  >
</div>
