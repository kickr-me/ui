<script>
  import { just_scored, score_red, score_white } from "../stores.js";
  import { send } from "../mqtt.js";
  import Score from "./Score.svelte";
  import UndoGoalButton from "./UndoGoalButton.svelte";

  function score(e, team) {
    const channel = "score/";
    send(channel + e.detail, team);
  }

  function resetTimer() {
    just_scored.set(false);
  }
</script>

<div class="flex flex-1 px-16 relative z-10 items-center justify-around">
  <Score score={score_white} on:scoreChange={e => score(e, 'white')} />
  <Score score={score_red} on:scoreChange={e => score(e, 'red')} />

  {#if $just_scored === true}
    <UndoGoalButton on:timerEnd={e => resetTimer()} />
  {/if}
</div>
