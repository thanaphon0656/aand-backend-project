import MainService from "./../services/main.service";
import { checkPageLimit, buildDataReturn } from "./../utils/pagination";
import { PaginationV1WithApiKeyDto } from './../dtos/utilities.dto';
import { HttpException } from "./../exceptions/HttpException";

export default class CompleteTheWordService extends MainService {
  constructor() {
    super();
  }

  public async listCompleteTheWord(pagination: PaginationV1WithApiKeyDto): Promise<any> {
    if (pagination.api_key !== process.env.API_KEY) {
      throw new HttpException(400, 'API key is not found');
    }

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
      query.level_id = { $regex: new RegExp(pagination.search, 'i') };
    }
    
    const result = await this.model.completeTheWordLevel
    .find(query)
    .sort(sort_data)
    .lean()
    .populate("complete_the_word_master_id");
  
    const total = await this.model.completeTheWordLevel.countDocuments(query);

    const paginatedData = await checkPageLimit(result, pagination.limit, pagination.page);

    return buildDataReturn({
      results: paginatedData,
      page: pagination.page,
      limit: pagination.limit,
      total: total
    });
  }
}
