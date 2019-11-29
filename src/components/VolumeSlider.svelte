<script>
  import { send } from "../mqtt.js";
  let value = 0;

  function handleChange(e) {
    const channel = "sound/volume";
    send(channel, value.toString());
  }
</script>

<style>
  .slidercontainer {
    margin-left: 20px;
  }
</style>

<div class="slidercontainer">
  <input
    type="range"
    min="0"
    max="100"
    bind:value
    on:change={handleChange}
    {value} />
</div>
