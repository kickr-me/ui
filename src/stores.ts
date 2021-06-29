import { writable } from "svelte/store";

let Team = {
  attack: "",
  defense: "",
};

export const game_status = writable("stopped");
export const just_scored = writable(false);
export const score_red = writable(0);
export const score_white = writable(0);
export const goals = writable([]);
export const round = writable(1);
export const volume = writable("50");
export const teams = writable({
  red: Object.create(Team),
  white: Object.create(Team),
});
