<script lang="ts">
  import { selected_players } from "../stores";
  import PlayerAvatar from "./Player/PlayerAvatar.svelte";

  export let team: number;

  const teamIndex = (): number => {
    if (team === 0) {
      return 0;
    } else {
      return 2;
    }
  };

  const switchIcon = `<svg
        width="27"
        height="22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-gray-700 fill-current"
        ><path
          d="M26.625 6.625L20.792.792v4.375H10.583v2.916h10.209v4.375l5.833-5.833zM6.208 9.542L.375 15.375l5.833 5.833v-4.375h10.209v-2.916H6.208V9.542z"
        /></svg
      >`;

  const switchRoles = () => {
    [$selected_players[teamIndex()], $selected_players[teamIndex() + 1]] = [
      $selected_players[teamIndex() + 1],
      $selected_players[teamIndex()],
    ];
  };

  const placeholder = `<div class="w-16 h-16 rounded-full bg-gray-300"><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
</svg></div>`;
</script>

<div class="flex flex-row gap-4 h-16 z-20">
  {#if $selected_players[teamIndex()] !== undefined}
    <PlayerAvatar
      avatarUrl={$selected_players[teamIndex()].avatar_url}
      selected={true}
      size={"small"}
      role={"attack"}
      team={teamIndex()}
    />
  {:else}
    {@html placeholder}
  {/if}
  <button
    class="flex h-11 w-11 rounded-full self-center justify-center place-items-center bg-gray-300"
    on:click={() => switchRoles()}>{@html switchIcon}</button
  >
  {#if $selected_players[teamIndex() + 1] !== undefined}
    <PlayerAvatar
      avatarUrl={$selected_players[teamIndex() + 1].avatar_url}
      selected={true}
      size={"small"}
      role={"defense"}
      team={teamIndex()}
    />
  {:else}
    {@html placeholder}
  {/if}
</div>
