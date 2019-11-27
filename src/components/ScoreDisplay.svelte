<script>
  import { score_red, score_white } from "../stores.js";
  import { send } from "../mqtt.js";
  import Score from "./Score.svelte";

  function score(e, team) {
    const channel = "score/";
    send(channel + e.detail, team);
  }
</script>

<div class="flex flex-1 px-16 relative z-10 items-center justify-around">
  <Score score={score_white} on:scoreChange={e => score(e, 'white')} />
  <Score score={score_red} on:scoreChange={e => score(e, 'red')} />
</div>
