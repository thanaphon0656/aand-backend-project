import MainService from "../services/main.service";
import {
  CreateCharacterPuzzleLevel,
  UpdateCharacterPuzzleLevel
} from "../interfaces/characterPuzzleLevel.interface";

export default class CharacterPuzzleLevelService extends MainService {
  constructor() {
    super();
  }

  public async createCharacterPuzzleLevel(data: CreateCharacterPuzzleLevel): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.characterPuzzleLevel({
        game_id: data.game_id,
        level_id: data.level_id,
        title: data.title,
        description: data.description,
        character_puzzle_master_id: data.character_puzzle_master_id,
        difficulty: data.difficulty,
        time_limit: data.time_limit,
        is_active: true,
      });

      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateCharacterPuzzleLevel(id: string, data: Partial<UpdateCharacterPuzzleLevel>): Promise<[boolean, any]> {
    try {
      const updateData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== undefined) acc[key] = data[key];
        return acc;
      }, {} as any);

      if (Object.keys(updateData).length === 0) {
        return [false, "No valid fields provided for update."];
      }

      updateData.updated_at = new Date();

      const updatedRecord = await this.model.characterPuzzleLevel.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedRecord) {
        return [false, "Record not found."];
      }

      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllCharacterPuzzleLevels(): Promise<[boolean, any]> {
    try {
      const records = await this.model.characterPuzzleLevel.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getCharacterPuzzleLevelById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.characterPuzzleLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteCharacterPuzzleLevel(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.characterPuzzleLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.characterPuzzleLevel.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
