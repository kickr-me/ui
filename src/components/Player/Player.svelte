<script>
  import PlayerAvatar from "./PlayerAvatar.svelte";

  export let player;

  let selected = false;

  function handleClick(e) {
    selected = !selected;
  }
</script>

<div class="player flex flex-col items-center cursor-pointer transform active:scale-95" on:click={handleClick}>
  <PlayerAvatar avatarUrl={player.avatar_url} {selected}/>
  <span class="block text-center text-gray-700 font-semibold">{player.username}</span>
</div>
