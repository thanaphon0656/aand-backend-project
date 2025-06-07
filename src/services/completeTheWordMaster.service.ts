import MainService from "../services/main.service";
import { 
  CreateCompleteTheWordMaster, 
  UpdateCompleteTheWordMaster 
} from "../interfaces/completeTheWordMaster.interface";
import { PaginationV1WithSortSearchDto } from './../dtos/utilities.dto';
import { checkPageLimit, buildDataReturn } from "./../utils/pagination";
import { HttpException } from "./../exceptions/HttpException";

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

  public async listCompleteTheWordMaster(pagination: PaginationV1WithSortSearchDto): Promise<any> {
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
        query.word = { $regex: new RegExp(pagination.search, 'i') } 
      }
      
      const result = await this.model.completeTheWordMaster.find(query)
        .sort(sort_data)
        .lean()
  
      const total = await this.model.completeTheWordMaster.countDocuments(query);
  
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
