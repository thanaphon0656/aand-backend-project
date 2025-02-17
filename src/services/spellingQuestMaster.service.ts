import MainService from "../services/main.service";
import {
  CreateSpellingQuestMaster,
  UpdateSpellingQuestMaster
} from "../interfaces/spellingQuestMaster.interface";

export default class SpellingQuestMasterService extends MainService {
  constructor() {
    super();
  }

  public async createSpellingQuestMaster(data: CreateSpellingQuestMaster): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.spellingQuestMaster(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateSpellingQuestMaster(id: string, data: Partial<UpdateSpellingQuestMaster>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.spellingQuestMaster.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllSpellingQuestMasters(): Promise<[boolean, any]> {
    try {
      const records = await this.model.spellingQuestMaster.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getSpellingQuestMasterById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.spellingQuestMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteSpellingQuestMaster(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.spellingQuestMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.spellingQuestMaster.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
