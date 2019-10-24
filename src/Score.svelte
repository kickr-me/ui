<script>
  export let score;

  function increase() {
    score += 1;
  }

  function decrease() {
    if (score > 0) {
      score -= 1;
    }
  }
</script>

<style>
  .score__value {
    font-size: 18rem;
  }
</style>

<button class="button" on:click={increase}>+</button>
<span class="score__value">{score}</span>
<button class="button" on:click={decrease}>-</button>
