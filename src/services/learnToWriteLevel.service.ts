import MainService from "../services/main.service";
import {
  CreateLearnToWriteLevel,
  UpdateLearnToWriteLevel
} from "../interfaces/learnToWriteLevel.interface";

export default class LearnToWriteLevelService extends MainService {
  constructor() {
    super();
  }

  public async createLearnToWriteLevel(data: CreateLearnToWriteLevel): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.learnToWriteLevel({
        game_id: data.game_id,
        level_id: data.level_id,
        title: data.title,
        description: data.description,
        type: data.type,
        learn_to_write_master_id: data.learn_to_write_master_id,
        difficulty: data.difficulty,
        time_limit: data.time_limit,
      });

      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateLearnToWriteLevel(id: string, data: Partial<UpdateLearnToWriteLevel>): Promise<[boolean, any]> {
    try {
      const updateData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== undefined) acc[key] = data[key];
        return acc;
      }, {} as any);

      if (Object.keys(updateData).length === 0) {
        return [false, "No valid fields provided for update."];
      }

      updateData.updated_at = new Date();

      const updatedRecord = await this.model.learnToWriteLevel.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedRecord) {
        return [false, "Record not found."];
      }

      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllLearnToWriteLevels(): Promise<[boolean, any]> {
    try {
      const records = await this.model.learnToWriteLevel.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getLearnToWriteLevelById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.learnToWriteLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteLearnToWriteLevel(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.learnToWriteLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.learnToWriteLevel.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
