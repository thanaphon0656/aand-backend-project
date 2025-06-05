import MainService from "./../services/main.service";
import {
  CreateLearnToWriteMaster,
  UpdateLearnToWriteMaster,
} from "./../interfaces/learnToWriteMaster.interface";
import { PaginationV1WithSortSearchDto } from './../dtos/utilities.dto';
import { checkPageLimit, buildDataReturn } from "./../utils/pagination";
import { HttpException } from "./../exceptions/HttpException";

export default class LearnToWriteService extends MainService {
  constructor() {
    super();
  }

  public async createLearnToWriteMaster(data: CreateLearnToWriteMaster): Promise<[boolean, any]> {
    try {
      const newEntry = new this.model.learnToWriteMaster({
        game_id: data.game_id,
        letter: data.letter,
        image_url: data.image_url,
      });
      await newEntry.save();
      return [true, newEntry];
    } catch (error) {
      throw error;
    }
  }

  public async updateLearnToWriteMaster(id: string, data: Partial<UpdateLearnToWriteMaster>): Promise<[boolean, any]> {
    try {
      const updateData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== undefined) acc[key] = data[key];
        return acc;
      }, {} as any);

      if (Object.keys(updateData).length === 0) {
        return [false, "No valid fields provided for update."];
      }
      updateData.updated_at = new Date();

      const updatedEntry = await this.model.learnToWriteMaster.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true }
      );

      if (!updatedEntry) {
        return [false, "Entry not found."];
      }

      return [true, updatedEntry];
    } catch (error) {
      throw error;
    }
  }

  public async getAllLearnToWriteMaster(): Promise<[boolean, any]> {
    try {
      const entries = await this.model.learnToWriteMaster.find();
      return [true, entries];
    } catch (error) {
      throw error;
    }
  }

  public async getLearnToWriteMasterById(id: string): Promise<[boolean, any]> {
    try {
      const entry = await this.model.learnToWriteMaster.findById(id);
      if (!entry) {
        return [false, "Entry not found."];
      }
      return [true, entry];
    } catch (error) {
      throw error;
    }
  }

  public async deleteLearnToWriteMaster(id: string): Promise<[boolean, string]> {
    try {
      const entry = await this.model.learnToWriteMaster.findById(id);
      if (!entry) {
        return [false, "Entry not found."];
      }
      await this.model.learnToWriteMaster.deleteOne({ _id: id });
      return [true, "Entry deleted successfully."];
    } catch (error) {
      throw error;
    }
  }

  public async listLearnToWriteMaster(pagination: PaginationV1WithSortSearchDto): Promise<any> {
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
      
      const result = await this.model.learnToWriteMaster.find(query)
        .sort(sort_data)
        .lean()
  
      const total = await this.model.learnToWriteMaster.countDocuments(query);
  
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
