import MainService from "../services/main.service";
import {
  CreateLetterMatchWordsLevel,
  UpdateLetterMatchWordsLevel
} from "../interfaces/letterMatchWordsLevel.interface";

export default class LetterMatchWordsLevelService extends MainService {
  constructor() {
    super();
  }

  public async createLetterMatchWordsLevel(data: CreateLetterMatchWordsLevel): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.letterMatchWordsLevel(data);
      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateLetterMatchWordsLevel(id: string, data: Partial<UpdateLetterMatchWordsLevel>): Promise<[boolean, any]> {
    try {
      const updatedRecord = await this.model.letterMatchWordsLevel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedRecord) {
        return [false, "Record not found."];
      }
      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllLetterMatchWordsLevels(): Promise<[boolean, any]> {
    try {
      const records = await this.model.letterMatchWordsLevel.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getLetterMatchWordsLevelById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.letterMatchWordsLevel
        .findById(id)
        .populate('letter_match_words_master_id');
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteLetterMatchWordsLevel(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.letterMatchWordsLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.letterMatchWordsLevel.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }
}
