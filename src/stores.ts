import { writable } from "svelte/store";
import type { ITeams } from "./interfaces/teams";

const teamsObj: ITeams = {
  red: { attack: undefined, defense: undefined },
  white: { attack: undefined, defense: undefined },
};

function createTeam() {
  const { subscribe, set } = writable(teamsObj);

  return {
    subscribe,
    set: (value: any) => set(value),
    reset: () => {
      set({
        red: { attack: undefined, defense: undefined },
        white: { attack: undefined, defense: undefined },
      });
    },
  };
}

export const game_status = writable("stopped");
export const just_scored = writable(false);
export const score_red = writable(0);
export const score_white = writable(0);
export const goals = writable([]);
export const round = writable(1);
export const volume = writable("50");
export const players = writable([]);
export const max_player_count = writable(4);
export const teams = createTeam();
export const spotify_status = writable("");
export const spotify_track = writable({});
export const winner = writable("");
export const game_end = writable({});
