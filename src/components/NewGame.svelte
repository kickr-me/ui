<script>
  import { game_running } from "../stores.js";

  function startGame() {
    game_running.set(true);
  }
</script>

<div class="h-full flex justify-center items-center">
  <button
    on:click={startGame}
    class="bg-gray-300 hover:bg-gray-400 font-semibold shadow-lg text-xl
    text-gray-700 py-4 px-6 rounded-full">
    Start Game
  </button>
</div>
