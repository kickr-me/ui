<script>
  import { game_running } from "../stores.js";

  function startGame() {
    game_running.set(true);
  }
</script>

<div class="h-full flex justify-center items-center">
  <button
    on:click={startGame}
    class="bg-gray-300 hover:bg-gray-400 font-semibold shadow-lg text-lg
    text-gray-700 py-2 px-4 rounded-full">
    Start Game
  </button>
</div>
