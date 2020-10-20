<script>
  export let name;
  export let avatarUrl;

  let selected = false;

  function handleClick(e) {
    selected = !selected;
  }
</script>

<style>
  .player__avatar {
    height: 120px;
    width: 120px;
  }

  .selected {
    @apply border-solid;
    @apply border-4;
    @apply border-red-400;
  }
</style>

<div class="player flex flex-col items-center cursor-pointer transform active:scale-95" on:click={handleClick}>
  <div class="player__avatar mb-2 rounded-full overflow-hidden" class:selected="{selected === true}">
    <img
      src="{avatarUrl ? avatarUrl : 'https://thebark.com/sites/default/files/styles/feature/public/content/article/full/toshi-1072049-unsplash.jpg?itok=WJGzLyJ4'}"
      alt=""
      class="object-cover w-full h-full"/>
  </div>
  <span class="block text-center text-gray-700 font-semibold">{name}</span>
</div>
