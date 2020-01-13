import { writable } from "svelte/store";

export const game_running = writable(false);
export const just_scored = writable(false);
export const score_red = writable(0);
export const score_white = writable(0);
export const goals = writable([]);
