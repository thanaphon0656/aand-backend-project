import MainService from "../services/main.service";
import { 
  CreateCharacterPuzzleMaster, 
  UpdateCharacterPuzzleMaster 
} from "../interfaces/characterPuzzleMaster.interface";
import { PaginationV1WithSortSearchDto } from './../dtos/utilities.dto';
import { checkPageLimit, buildDataReturn } from "./../utils/pagination";
import { HttpException } from "./../exceptions/HttpException";

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

  public async listCharacterPuzzleMaster(pagination: PaginationV1WithSortSearchDto): Promise<any> {
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
        query.letter = { $regex: new RegExp(pagination.search, 'i') } 
      }
      
      const result = await this.model.characterPuzzleMaster.find(query)
        .sort(sort_data)
        .lean()
  
      const total = await this.model.characterPuzzleMaster.countDocuments(query);
  
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
