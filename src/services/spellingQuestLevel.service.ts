import MainService from "../services/main.service";
import { CreateSpellingQuestLevel, UpdateSpellingQuestLevel } from "../interfaces/spellingQuestLevel.interface";

export default class SpellingQuestLevelService extends MainService {
  constructor() {
    super();
  }

  public async createSpellingQuestLevel(data: CreateSpellingQuestLevel): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.spellingQuestLevel(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateSpellingQuestLevel(id: string, data: Partial<UpdateSpellingQuestLevel>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.spellingQuestLevel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllSpellingQuestLevels(): Promise<[boolean, any]> {
    try {
      const records = await this.model.spellingQuestLevel.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getSpellingQuestLevelById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.spellingQuestLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteSpellingQuestLevel(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.spellingQuestLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.spellingQuestLevel.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}