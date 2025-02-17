import MainService from "../services/main.service";
import { 
  CreateCompleteTheWordMaster, 
  UpdateCompleteTheWordMaster 
} from "../interfaces/completeTheWordMaster.interface";

export default class CompleteTheWordMasterService extends MainService {
  constructor() {
    super();
  }

  public async createCompleteTheWordMaster(data: CreateCompleteTheWordMaster): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.completeTheWordMaster(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateCompleteTheWordMaster(id: string, data: Partial<UpdateCompleteTheWordMaster>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.completeTheWordMaster.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllCompleteTheWordMasters(): Promise<[boolean, any]> {
    try {
      const records = await this.model.completeTheWordMaster.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getCompleteTheWordMasterById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.completeTheWordMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteCompleteTheWordMaster(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.completeTheWordMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.completeTheWordMaster.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
