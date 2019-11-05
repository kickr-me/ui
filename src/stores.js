import { writable } from "svelte/store";

function createCount() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => Math.max(0, n - 1)),
    reset: () => set(0)
  };
}

export const score_red = createCount();
export const score_white = createCount();
