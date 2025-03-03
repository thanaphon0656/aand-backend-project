import MainService from "../services/main.service";
import {
  CreateWordChoiceLevel,
  UpdateWordChoiceLevel
} from "../interfaces/wordChoiceLevel.interface";

export default class WordChoiceLevelService extends MainService {
  constructor() {
    super();
  }

  public async createWordChoiceLevel(data: CreateWordChoiceLevel): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.wordChoiceLevel(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateWordChoiceLevel(id: string, data: Partial<UpdateWordChoiceLevel>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.wordChoiceLevel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllWordChoiceLevels(): Promise<[boolean, any]> {
    try {
      const records = await this.model.wordChoiceLevel.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getWordChoiceLevelById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.wordChoiceLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteWordChoiceLevel(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.wordChoiceLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.wordChoiceLevel.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
