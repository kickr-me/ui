import { writable } from "svelte/store";

function createCount() {
  const { subscribe, set } = writable(0);

  return {
    subscribe,
    reset: () => set(0)
  };
}

export const score_red = createCount();
export const score_white = createCount();
