import MainService from "../services/main.service";
import { 
  CreateLetterMatchWordsMaster, 
  UpdateLetterMatchWordsMaster 
} from "../interfaces/letterMatchWordsMaster.interface";

export default class LetterMatchWordsMasterService extends MainService {
  constructor() {
    super();
  }

  public async createLetterMatchWordsMaster(data: CreateLetterMatchWordsMaster): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.letterMatchWordsMaster(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateLetterMatchWordsMaster(id: string, data: Partial<UpdateLetterMatchWordsMaster>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.letterMatchWordsMaster.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllLetterMatchWordsMasters(): Promise<[boolean, any]> {
    try {
      const records = await this.model.letterMatchWordsMaster.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getLetterMatchWordsMasterById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.letterMatchWordsMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteLetterMatchWordsMaster(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.letterMatchWordsMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.letterMatchWordsMaster.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
