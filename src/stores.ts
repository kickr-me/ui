import { get, writable } from "svelte/store";
import type { IPlayer } from "./interfaces/player";

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
export const max_player_count = writable(4);
export const teams = writable({
  red: Object.create(Team),
  white: Object.create(Team),
});

let selectedPlayers: IPlayer[] = new Array(get(max_player_count));
selectedPlayers.fill(undefined);
Object.seal(selectedPlayers);

export const selected_players = writable(selectedPlayers);
