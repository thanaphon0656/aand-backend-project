import UploadS3Service from "../services/uploadToS3.service";
import { IMAGE_EXTENSIONS, TYPE_MEDIA } from "./../consts/file";
import folderModel from "./../models/folder.model";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export default class FilesService {
  private uploadS3Service: UploadS3Service;

  constructor() {
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

      return {
        data: {
          url: location,
        },
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
