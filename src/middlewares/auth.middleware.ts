import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { HttpException } from "@exceptions/HttpException";
import {
  DataStoredInToken,
  RequestWithPlayer,
} from "@interfaces/auth.interface";
import playerModel from "@/models/player.model";

const authMiddleware = async (
  req: RequestWithPlayer,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization =
      (req.header("Authorization")
        ? req.header("Authorization").split("Bearer ")[1]
        : null) || req.cookies["Authorization"];

    if (Authorization) {
      const secret_key: string = SECRET_KEY;
      const verification_response = (await verify(
        Authorization,
        secret_key
      )) as DataStoredInToken;
      const player_id = verification_response._id;
      const find_player = await playerModel.findById(player_id);

      if (find_player) {
        if (
          req.params.player_id != undefined &&
          req.params.player_id != find_player._id.toString()
        ) {
          next(
            new HttpException(
              401,
              "login data not match please check your data"
            )
          );
        }

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
};

export default authMiddleware;
