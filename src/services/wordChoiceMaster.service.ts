import MainService from "../services/main.service";
import { 
  CreateWordChoiceMasterMaster, 
  UpdateWordChoiceMasterMaster 
} from "../interfaces/wordChoiceMaster.interface";

export default class WordChoiceMasterService extends MainService {
  constructor() {
    super();
  }

  public async createWordChoiceMaster(data: CreateWordChoiceMasterMaster): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.wordChoiceMaster(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateWordChoiceMaster(id: string, data: Partial<UpdateWordChoiceMasterMaster>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.wordChoiceMaster.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllWordChoiceMasters(): Promise<[boolean, any]> {
    try {
      const records = await this.model.wordChoiceMaster.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getWordChoiceMasterById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.wordChoiceMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteWordChoiceMaster(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.wordChoiceMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.wordChoiceMaster.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
