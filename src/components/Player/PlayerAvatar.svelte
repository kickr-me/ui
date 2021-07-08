<script lang="ts">
  export let avatarUrl: string;
  export let selected = false;
  export let size = "big";
  export let role = "";
  export let team: string;

  const placeholderImg =
    "https://thebark.com/sites/default/files/styles/feature/public/content/article/full/toshi-1072049-unsplash.jpg?itok=WJGzLyJ4";

  const swordIcon = `<svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current w-4 h-4"
        >
          <path
            d="M6.92 5H5l9 9 1-.94m4.96 6.06l-.84.84a.996.996 0 01-1.41 0l-3.12-3.12-2.68 2.66-1.41-1.41 1.42-1.42L3 7.75V3h4.75l8.92 8.92 1.42-1.42 1.41 1.41-2.67 2.67 3.12 3.12c.4.4.4 1.03.01 1.42z"
          />
        </svg>`;

  const shieldIcon = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="fill-current w-4 h-4"
      >
        <path
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
        />
      </svg>`;
</script>

<div class="relative">
  <div
    class={`player__avatar mb-2 rounded-full overflow-hidden ${size} ${
      selected ? "border-solid border-4" : ""
    } ${selected && team === "red" ? "border-red-400" : "border-gray-300"}`}
  >
    <img
      src={avatarUrl ? avatarUrl : placeholderImg}
      alt=""
      class="object-cover w-full h-full"
    />
  </div>
  {#if role}
    <span
      class={`absolute top-0 right-0 p-1 rounded-full ${
        team === "red" ? "bg-red-400 text-white" : "bg-gray-300 text-gray-700"
      }`}
    >
      {#if role === "attack"}
        {@html swordIcon}
      {:else if role === "defense"}
        {@html shieldIcon}
      {/if}
    </span>
  {/if}
</div>

<style>
  .player__avatar.big {
    height: 100px;
    width: 100px;
  }

  .player__avatar.small {
    height: 64px;
    width: 64px;
  }
</style>
