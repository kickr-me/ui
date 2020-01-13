<script>
  import { just_scored, score_red, score_white } from "../stores.js";
  import { send } from "../mqtt.js";
  import Score from "./Score.svelte";
  import UndoGoalButton from "./UndoGoalButton.svelte";

  let undoGoalButton;

  function score(e, team) {
    const channel = "score/";
    send(channel + e.detail, team);
    if ($just_scored === true) {
      undoGoalButton.resetTimer();
    }
  }

  function hideUndo() {
    just_scored.set(false);
  }
</script>

<div class="flex flex-1 relative z-10 items-center justify-around">
  <Score score={score_white} on:scoreAdapt={e => score(e, 'white')} />
  <Score score={score_red} on:scoreAdapt={e => score(e, 'red')} />

  {#if $just_scored === true}
    <UndoGoalButton bind:this={undoGoalButton} on:timerEnd={e => hideUndo()} />
  {/if}
</div>
