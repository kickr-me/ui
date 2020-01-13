<script>
  import { round } from "../stores.js";
</script>

<style>
  .round-display {
    display: grid;
    grid-row-gap: 35px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="round-display absolute text-gray-600 text-lg text-center">
  <span>Round {$round}</span>
  <span>0:00</span>
</div>
