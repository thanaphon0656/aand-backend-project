import MainService from "./../services/main.service";
import UploadS3Service from "./../services/uploadToS3.service";
import { IMAGE_EXTENSIONS, TYPE_MEDIA } from "./../consts/file";
import folderModel from "./../models/folder.model";
import { HttpException } from "./../exceptions/HttpException";
import { PaginationV1WithSortSearchDto } from './../dtos/utilities.dto';
import { checkPageLimit, buildDataReturn } from "./../utils/pagination";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export default class FilesService extends MainService {
  private uploadS3Service: UploadS3Service;

  constructor() {
    super();
    this.uploadS3Service = new UploadS3Service();
  }

  // Define the method correctly as part of the class
  public async uploadFileToS3(id: string, folder: string, file: any) {
    try {
      if (!file) {
        throw `Need file to upload.`;
      }
      if (!id || !folder) {
        throw `Need folder to upload.`;
      }

      const typeFile = this.isFileValid(file);

      if (typeFile === true) {
        const maxSizeImg = 10485760; // 10MB
        if (file.size > maxSizeImg) {
          throw `The file could not be uploaded because it was too large.`;
        }
      } else {
        const maxSizeFile = 104857600; // 100MB
        if (file.size > maxSizeFile) {
          throw `The file could not be uploaded because it was too large.`;
        }
      }

      let folderId = null;
      let fileExtension = file.originalname
        ? file.originalname.split(".")[file.originalname.split(".").length - 1]
        : null;
      let mediaType = null;

      if (IMAGE_EXTENSIONS.includes(fileExtension.toLowerCase())) {
        mediaType = TYPE_MEDIA[0];  // 'image'
      } else if (fileExtension === "pdf" || fileExtension === "PDF") {
        mediaType = TYPE_MEDIA[1];  // 'pdf'
      } else {
        mediaType = TYPE_MEDIA[2];  // 'other'
      }

      const checkFolder = await folderModel
        .findOne({ name: folder })
        .select({ _id: 1, name: 1 })
        .lean();

      if (checkFolder) {
        folderId = checkFolder._id;
      } else {
        const newFolderId = new ObjectId();
        const newUploadFolder = new folderModel({
          _id: newFolderId,
          name: folder,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await newUploadFolder.save();
        folderId = newFolderId;
      }

      const { location } = await this.uploadS3Service.uploadFile(
        file,
        folder,
        id,
        folderId,
        fileExtension,
        mediaType
      );

      return location
      
    } catch (err) {
      throw err;
    }
  }

  public async listFile(pagination: PaginationV1WithSortSearchDto): Promise<any> {
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

    const query: any = {};

    if (pagination.search) {
      query.difficulty = { $regex: new RegExp(pagination.search, 'i') };
    }

    const result = await this.model.file.find(query)
      .sort(sort_data)
      .lean();

    const total = await this.model.file.countDocuments(query);

    const paginatedData = await checkPageLimit(result, pagination.limit, pagination.page);

    return buildDataReturn({
      results: paginatedData,
      page: pagination.page,
      limit: pagination.limit,
      total: total
    });
  }

  public async deleteFile(file_id: string) {
    try {

      const file = await this.model.file.findById(file_id);
      if (!file) {
        throw new HttpException(400, "Unable to delete data, file id is not found");
      }

      // Delete file from S3
      await this.uploadS3Service.deleteFile(file.key);

      // Delete file record from database
      await this.model.file.deleteOne({ _id: new ObjectId(file_id) });

      return {
        message: "File deleted successfully.",
      };
    } catch (err) {
      throw err;
    }
  }

  // File validation helper method
  private isFileValid(file: any) {
    const type = file.originalname.split(".").pop();
    const validTypes = ["jpg", "jpeg", "png", "svg", "webp", "pdf"];
    return validTypes.indexOf(type) !== -1;
  }
}
