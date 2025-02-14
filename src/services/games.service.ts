import MainService from "@services/main.service";
import mongoose from "mongoose";
import { HttpException } from "@/exceptions/HttpException";
import {
  CreateGamesAdmin,
  UpdateGamesAdmin,
  DetailGamesAdmin,
  DeleteGamesAdmin
} from '@/interfaces/games.interface';

export default class GamesService extends MainService {
  constructor() {
    super();
  }

  public async createGamesAdmin(data: CreateGamesAdmin): Promise<[boolean, any]> {
    try {

      const createGames = new this.model.games({
        name_th: data.name_th,
        name_en: data.name_en,
        description: data.description,
      });

      await createGames.save();
      return [true, createGames];
    } catch (error: any) {
      throw error;
    }
  }

  public async updateGamesAdmin(id: string, data: Partial<UpdateGamesAdmin>): Promise<[boolean, any]> {
    try {
      const updateData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== undefined) acc[key] = data[key];
        return acc;
      }, {} as any);

      if (Object.keys(updateData).length === 0) {
        return [false, "No valid fields provided for update."];
      }

      updateData.updated_at = new Date();

      const updatedGames = await this.model.games.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true }
      );

      if (!updatedGames) {
        return [false, "Unable to update data, game not found."];
      }

      return [true, updatedGames];
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllGamesAdmin(): Promise<[boolean, any]> {
    try {
      const games = await this.model.games.find();
      return [true, games];
    } catch (error) {
      throw error;
    }
  }

  public async getGameDetailById(id: string): Promise<any> {
    try {
      const game = await this.model.games.findById(id);

      if (!game) {
        return [false, "Game not found."];
      }

      return [true, game];
    } catch (error) {
      throw error;
    }
  }

  public async deleteGamesAdmin(id: string): Promise<[boolean, string]> {
    try {
      const game = await this.model.games.findById(id);

      if (!game) {
        return [false, "Game not found."];
      }

      await this.model.games.deleteOne({ _id: id });

      return [true, "Game deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
