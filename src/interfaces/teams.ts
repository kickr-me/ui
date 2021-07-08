import type { IPlayer } from "./player";

export interface ITeam {
  attack: IPlayer;
  defense: IPlayer;
}

export interface ITeams {
  red: ITeam;
  white: ITeam;
}
