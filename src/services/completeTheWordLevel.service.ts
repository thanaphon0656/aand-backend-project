import MainService from "../services/main.service";
import {
  CreateCompleteTheWordLevel,
  UpdateCompleteTheWordLevel
} from "../interfaces/completeTheWordLevel.interface";

export default class CompleteTheWordLevelService extends MainService {
  constructor() {
    super();
  }

  public async createCompleteTheWordLevel(data: CreateCompleteTheWordLevel): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.completeTheWordLevel(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateCompleteTheWordLevel(id: string, data: Partial<UpdateCompleteTheWordLevel>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.completeTheWordLevel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllCompleteTheWordLevels(): Promise<[boolean, any]> {
    try {
      const records = await this.model.completeTheWordLevel.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getCompleteTheWordLevelById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.completeTheWordLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteCompleteTheWordLevel(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.completeTheWordLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.completeTheWordLevel.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
