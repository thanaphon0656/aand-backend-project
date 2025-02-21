import MainService from "./../services/main.service";
import {
  CreateLearnToWriteMaster,
  UpdateLearnToWriteMaster,
} from "./../interfaces/learnToWriteMaster.interface";

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
      console.log("records", entries)
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
}
