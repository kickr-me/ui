<script>
  export let score;
</script>

<style>
  .score__value {
    font-size: 15rem;
    line-height: 1;
  }
</style>

<button class="button" on:click={score.increment}>+</button>
<span class="score__value">{$score}</span>
<button class="button" on:click={score.decrement}>-</button>
