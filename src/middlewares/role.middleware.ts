import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { HttpException } from "@exceptions/HttpException";
import {
  DataStoredInToken,
  RequestWithPlayer,
} from "@interfaces/auth.interface";
import playerModel from "@/models/player.model";

export default class roleMiddleware implements ExpressMiddlewareInterface {
  public role;

  constructor() {
    this.role = "admin";
  }

  async use(req: any, res: Response, next: NextFunction) {
    try {
      const Authorization =
        req.cookies["Authorization"] ||
        (req.header("Authorization")
          ? req.header("Authorization").split("Bearer ")[1]
          : null);

      if (Authorization) {
        const secret_key: string = SECRET_KEY;
        const verification_response = (await verify(
          Authorization,
          secret_key
        )) as DataStoredInToken;
        const player_id = verification_response._id;

        let find_player = null;

        if (req.player != undefined || req.player != null) {
          find_player = req.player;
        } else {
          find_player = await playerModel.findById(player_id);
        }

        if (find_player.role != this.role) {
          next(new HttpException(401, "Your role wrong"));
        }

        if (find_player) {
          req.player = find_player;
          next();
        } else {
          next(new HttpException(401, "Unauthorized"));
        }
      } else {
        next(new HttpException(401, "Unauthorized"));
      }
    } catch (error) {
      next(new HttpException(401, "Unauthorized"));
    }
  }
}
