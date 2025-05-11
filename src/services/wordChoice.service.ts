import MainService from "./../services/main.service";
import { checkPageLimit, buildDataReturn } from "./../utils/pagination";
import { PaginationV1WithApiKeyDto } from './../dtos/utilities.dto';
import { HttpException } from "./../exceptions/HttpException";
import { shuffle } from 'lodash';

export default class WordChoiceService extends MainService {
  constructor() {
    super();
  }

  public async listWordChoice(pagination: PaginationV1WithApiKeyDto): Promise<any> {
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
      query.$or = [
        { level_id: { $regex: new RegExp(pagination.search, 'i') } },
        { difficulty: { $regex: new RegExp(pagination.search, 'i') } }
      ];
    }

    const result: any = await this.model.wordChoiceLevel
      .find(query)
      .sort(sort_data)
      .lean()
      .populate("word_choice_master_id");

    if (!result.length) {
      throw new HttpException(400, "No word choice level found");
    }
    const total = await this.model.wordChoiceLevel.countDocuments(query);

    // for (const item of result) {
    //   if (item.word_choice_master_id) {
    //     const correctWord = item.word_choice_master_id.word;
    //     const dummyWords = await this.getDummyWords(correctWord, 2);

    //     item.word_choice_master_id = {
    //       ...item.word_choice_master_id,
    //       word: correctWord,
    //       choice: shuffle([correctWord, ...dummyWords]),
    //     };
    //   }
    // }

    const paginatedData = await checkPageLimit(result, pagination.limit, pagination.page);

    return buildDataReturn({
      results: paginatedData,
      page: pagination.page,
      limit: pagination.limit,
      total: total,
    });
  }


  private async getDummyWords(correctWord: string, count: number): Promise<string[]> {
    const filterWords = [correctWord];

    const dummyWords = await this.model.wordChoiceMaster.aggregate([
      { $match: { word: { $nin: filterWords }, is_active: true } },
      { $sample: { size: count } }
    ]);

    return dummyWords.map((w: any) => w.word);
  }
}
