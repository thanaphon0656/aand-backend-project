import MainService from "../services/main.service";
import {
  CreateCharacterPuzzleLevel,
  UpdateCharacterPuzzleLevel
} from "../interfaces/characterPuzzleLevel.interface";
import { PaginationV1WithSortSearchDto } from './../dtos/utilities.dto';
import { checkPageLimit, buildDataReturn } from "./../utils/pagination";
import { HttpException } from "./../exceptions/HttpException";

export default class CharacterPuzzleLevelService extends MainService {
  constructor() {
    super();
  }

  public async createCharacterPuzzleLevel(data: CreateCharacterPuzzleLevel): Promise<[boolean, any]> {
    try {
      const newRecord = new this.model.characterPuzzleLevel({
        game_id: data.game_id,
        level_id: data.level_id,
        title: data.title,
        description: data.description,
        character_puzzle_master_id: data.character_puzzle_master_id,
        difficulty: data.difficulty,
        time_limit: data.time_limit,
        is_active: true,
      });

      await newRecord.save();
      return [true, newRecord];
    } catch (error) {
      throw error;
    }
  }

  public async updateCharacterPuzzleLevel(id: string, data: Partial<UpdateCharacterPuzzleLevel>): Promise<[boolean, any]> {
    try {
      const updateData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== undefined) acc[key] = data[key];
        return acc;
      }, {} as any);

      if (Object.keys(updateData).length === 0) {
        return [false, "No valid fields provided for update."];
      }

      updateData.updated_at = new Date();

      const updatedRecord = await this.model.characterPuzzleLevel.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedRecord) {
        return [false, "Record not found."];
      }

      return [true, updatedRecord];
    } catch (error) {
      throw error;
    }
  }

  public async getAllCharacterPuzzleLevels(): Promise<[boolean, any]> {
    try {
      const records = await this.model.characterPuzzleLevel.find();
      return [true, records];
    } catch (error) {
      throw error;
    }
  }

  public async getCharacterPuzzleLevelById(id: string): Promise<[boolean, any]> {
    try {
      const record = await this.model.characterPuzzleLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      return [true, record];
    } catch (error) {
      throw error;
    }
  }

  public async deleteCharacterPuzzleLevel(id: string): Promise<[boolean, string]> {
    try {
      const record = await this.model.characterPuzzleLevel.findById(id);
      if (!record) {
        return [false, "Record not found."];
      }
      await this.model.characterPuzzleLevel.deleteOne({ _id: id });
      return [true, "Deleted successfully."];
    } catch (error) {
      throw error;
    }
  }

  public async listCharacterPuzzleLevel(pagination: PaginationV1WithSortSearchDto): Promise<any> {
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

      const result = await this.model.characterPuzzleLevel.find(query)
        .sort(sort_data)
        .lean()
        .populate("character_puzzle_master_id");

      const total = await this.model.characterPuzzleLevel.countDocuments(query);

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
