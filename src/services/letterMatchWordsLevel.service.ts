import MainService from "../services/main.service";
import {
  CreateLetterMatchWordsLevel,
  UpdateLetterMatchWordsLevel
} from "../interfaces/letterMatchWordsLevel.interface";
import { PaginationV1WithSortSearchDto } from './../dtos/utilities.dto';
import { checkPageLimit, buildDataReturn } from "./../utils/pagination";
import { HttpException } from "./../exceptions/HttpException";

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
      const records = await this.model.letterMatchWordsLevel.find()
      .lean()
      .populate("letter_match_words_master_id");
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

  public async listLetterMatchWordsLevel(pagination: PaginationV1WithSortSearchDto): Promise<any> {
    try {
      const validSortOptions = ['created_at', 'updated_at'];

      if (pagination.sort_option && !validSortOptions.includes(pagination.sort_option)) {
        throw new HttpException(400, `Validation error: \"sort_option\" must be a ${validSortOptions.join(' or ')}`);
      }

      if (pagination.page < 1) {
        throw new HttpException(400, "Validation error: \"page\" must be a positive number");
      }

      if (pagination.limit < 1) {
        throw new HttpException(400, "Validation error: \"limit\" must be a positive number");
      }

      const sort_data: { [key: string]: 1 | -1 } = {};
      sort_data[pagination.sort_option ? pagination.sort_option : 'created_at'] =
        pagination.sort === -1 ? -1 : 1;

      const query: any = { is_active: true };

      if (pagination.search) {
        query.$or = [
          { level_id: { $regex: new RegExp(pagination.search, 'i') } },
          { difficulty: { $regex: new RegExp(pagination.search, 'i') } },
          { title: { $regex: new RegExp(pagination.search, 'i') } }
        ];
      }

      const result = await this.model.letterMatchWordsLevel.find(query)
        .sort(sort_data)
        .lean()
        .populate("letter_match_words_master_id");

      const total = await this.model.letterMatchWordsLevel.countDocuments(query);

      const paginatedData = await checkPageLimit(result, pagination.limit, pagination.page);

      return buildDataReturn({
        results: paginatedData,
        page: pagination.page,
        limit: pagination.limit,
        total: total
      });

    } catch (error) {
      throw error;
    }
  }
}
