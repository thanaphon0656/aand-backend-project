import MainService from "../services/main.service";
import { 
  CreateCharacterPuzzleMaster, 
  UpdateCharacterPuzzleMaster 
} from "../interfaces/characterPuzzleMaster.interface";

export default class CharacterPuzzleMasterService extends MainService {
  constructor() {
    super();
  }

  public async createCharacterPuzzleMaster(data: CreateCharacterPuzzleMaster): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.characterPuzzleMaster(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateCharacterPuzzleMaster(id: string, data: Partial<UpdateCharacterPuzzleMaster>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.characterPuzzleMaster.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllCharacterPuzzleMasters(): Promise<[boolean, any]> {
    try {
      const records = await this.model.characterPuzzleMaster.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getCharacterPuzzleMasterById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.characterPuzzleMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteCharacterPuzzleMaster(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.characterPuzzleMaster.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.characterPuzzleMaster.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
