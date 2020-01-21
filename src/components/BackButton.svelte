<script>
  import { send } from "../mqtt.js";

  function stopGame() {
    const channel = "game/stop";
    send(channel, "");
  }
</script>

<style>
  .back-button:after {
    content: "";
    width: 40px;
    height: 40px;
  }
</style>

<div
  class="back-button center-center relative cursor-pointer"
  on:click={stopGame}>
  <svg
    width="22"
    height="20"
    class="fill-current text-gray-500"
    viewBox="0 0 22 20"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.3644 8.072H6.47085L11.4716 3.28815C12.1886 2.53502 12.1886 1.31797
      11.4716 0.564844C10.7546 -0.188281 9.59181 -0.188281 8.8688
      0.564844L0.54225 8.63835C0.18075 8.9878 0 9.46377 0 9.98795V10.0121C0
      10.5362 0.18075 11.0122 0.54225 11.3617L8.86278 19.4352C9.58578 20.1883
      10.7486 20.1883 11.4656 19.4352C12.1826 18.682 12.1826 17.465 11.4656
      16.7119L6.46483 11.928H19.3583C20.3766 11.928 21.202 11.0664 21.202
      10C21.208 8.9155 20.3826 8.072 19.3644 8.072Z" />
  </svg>
</div>
