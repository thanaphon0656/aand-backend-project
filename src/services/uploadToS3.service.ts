import File from '../models/file.model';
import aws from 'aws-sdk';
import md5 from 'md5';

aws.config.update({
  signatureVersion: 'v4',
  secretAccessKey: process.env.AWS_PROD_SECRET_ACCRESS_KEY,
  accessKeyId: process.env.AWS_PROD_ACCESS_KEY,
  region: process.env.AWS_PROD_REGION,
});

const s3 = new aws.S3();
const S3_BUCKET = process.env.AWS_PROD_BUCKET_NAME;

export default class FilesService {
  // Generate a unique file name with timestamp and file extension
  private renameFile(file: any, id: string): string {
    return md5(Date.now()) + '.' + id;
  }

  private buildFilePath(file: any, path: string, id: string): string {
    const fileExtension = file.originalname.split('.').pop();
    return `${path}/${id}/${this.renameFile(file, id)}.${fileExtension}`;
  }

  // Upload file to S3 and store the file details
  public async uploadFile(
    file: any,
    path: string,
    id: string,
    folderId?: string,
    fileExtension?: string,
    mediaType?: string
  ) {
    try {
      const params: any = {
        Bucket: S3_BUCKET,
        Key: this.buildFilePath(file, path, id),
        ACL: 'public-read',
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      
      const folderData = {
        folderId,
        fileExtension,
        mediaType,
      };
      return await this.upload(params, folderData);
    } catch (error) {
      throw error;
    }
  }

  private async upload(params: any, folderData: any) {
    try {
      const upload: any = await s3.upload(params).promise();
      const dateTime = new Date().getTime();
      const newFile: any = new File({
        key: upload.Key,
        bucket: upload.Bucket,
        location: upload.Location,
        versionId: upload.VersionId,
        folder: folderData.folderId,
        fileExtension: folderData.fileExtension,
        mediaType: folderData.mediaType,
        createdAt: dateTime,
        updatedAt: dateTime,
      });

      await newFile.save();
      return this.fileDetails(newFile);
    } catch (err) {
      throw err;
    }
  }

  private fileDetails(file: any) {
    const { key, location } = file;
    return {
      key,
      location,
    };
  }

  public async deleteFile(key: string) {
    try {
      if (!key) {
        throw new Error("S3 key is required");
      }

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
      };

      // ลบไฟล์จาก S3
      await s3.deleteObject(params).promise();

      // ลบไฟล์จาก MongoDB
      await File.findOneAndDelete({ key });

      return {
        status: true,
        message: "File successfully deleted from S3 and database",
      };
    } catch (err) {
      throw new Error(`Error deleting file: ${err.message}`);
    }
  }
}
