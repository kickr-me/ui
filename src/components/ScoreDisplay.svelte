<script lang="ts">
  import { just_scored, score_red, score_white } from "../stores";
  import { send } from "../mqtt";
  import { Team } from "../helpers/config";
  import Score from "./Score.svelte";
  import UndoGoalButton from "./UndoGoalButton.svelte";

  let undoGoalButton: UndoGoalButton | undefined;

  function score(e: CustomEvent, team: Team) {
    const channel = "score/";
    send(channel + e.detail, team);
  }

  function hideUndo() {
    just_scored.set(false);
  }

  $: $score_white, undoGoalButton?.resetTimer();
  $: $score_red, undoGoalButton?.resetTimer();
</script>

<div class="flex flex-1 relative z-10 items-center justify-around">
  <Score score={score_white} on:scoreAdapt={(e) => score(e, Team.White)} />
  <Score score={score_red} on:scoreAdapt={(e) => score(e, Team.Red)} />

  {#if $just_scored === true}
    <UndoGoalButton
      bind:this={undoGoalButton}
      on:timerEnd={(e) => hideUndo()}
    />
  {/if}
</div>
