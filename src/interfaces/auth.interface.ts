import { Request } from "express";
import { Admin } from "@/interfaces/admin.interface";

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expires_in: number;
}

export interface RequestWithAdmin extends Request {
  admin: Admin;
}
