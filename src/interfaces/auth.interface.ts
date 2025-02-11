import { Request } from "express";
import { Player } from "@/interfaces/player.interface";

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expires_in: number;
}

export interface RequestWithPlayer extends Request {
  player: Player;
}
