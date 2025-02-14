import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "./../config";
import { HttpException } from "./../exceptions/HttpException";
import { DataStoredInToken, RequestWithAdmin } from "./../interfaces/auth.interface";
import adminModel from "./../models/admin.model"; // ใช้เฉพาะ Admin Model

const authAdminMiddleware = async (
  req: RequestWithAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies?.["Authorization"];

    if (!token) {
      return next(new HttpException(401, "Unauthorized: No token provided"));
    }

    const verificationResponse = verify(token, SECRET_KEY) as DataStoredInToken;
    if (!verificationResponse?._id) {
      return next(new HttpException(401, "Unauthorized: Invalid token"));
    }

    const admin = await adminModel.findById(verificationResponse._id);
    if (!admin) {
      return next(new HttpException(401, "Role: Admin only"));
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new HttpException(401, "Unauthorized: Invalid token or session expired"));
  }
};

export default authAdminMiddleware;
