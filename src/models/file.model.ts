import mongoose from "mongoose";
const { Schema } = mongoose;

const fileSchema = new Schema({
  key: String,
  bucket: String,
  location: String,
  versionId: String,
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'folder'
  },
  mediaType: {
    type: String,
    default: null
  },
  fileExtension: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  current_time: {
    type: Date,
    default: Date.now,
  },
});

fileSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

const File = mongoose.model("file", fileSchema);

export default File;
