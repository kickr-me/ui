<script lang="ts">
  import { spotify_status, spotify_track } from "../stores";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let showSpotifyToast = false;

  const animateSpotifyToast = () => {
    showSpotifyToast = true;
    setTimeout(() => {
      showSpotifyToast = false;
    }, 5000);
  };

  $: $spotify_track, animateSpotifyToast();
</script>

<div
  aria-live="assertive"
  class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
>
  <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
    {#if showSpotifyToast}
      <div
        class="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
        transition:fly={{ duration: 1000, x: 500, easing: quintOut }}
      >
        <div class="w-0 flex-1">
          <div class="flex items-start">
            <div class="flex h-full">
              <img
                class="h-24 w-24 rounded-l-lg"
                src={`data:image/png;base64, ${$spotify_track.image}`}
                alt=""
              />
            </div>
            <div class="w-0 flex-1 p-4">
              <p class="text-sm text-gray-500">Current track</p>
              <p class="font-medium text-gray-900">
                {$spotify_track.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
