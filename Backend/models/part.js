import mongoose from "mongoose";

const { Schema } = mongoose;

const partSchema = new Schema(
  {
    name: String,
    category: String,
    categoryId: String,
    categoryPosition: Number,
    description: String,
    minimumSize: String,
    maximumSize: String,
    workingLoadLimit: String,
    hardware: String,
    dimensions: String,
    weight: String,
    caseQuantity: String,
    specSheetFilename: {
      filename: String,
      url: String,
    },
    installationInstructions: {
      filename: String,
      url: String,
    },
    orderCodes: [{
      code: String,
      finish: String,
      name: String,
    }],
    documents: [{
      filename: String,
      url: String,
    }],
    photos: [{
      filename: String,
      url: String,
      position: Number,
    }]
  },
  { timestamps: true }
);

export default mongoose.model("part", partSchema, "parts");