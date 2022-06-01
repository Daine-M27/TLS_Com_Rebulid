import mongoose from "mongoose";

const { Schema } = mongoose;

const positionSchema = new Schema(
  {
    categoriesOrder: [], // cateory ids in array
    partsOrder: [ // array of partsOrder objects for each category
      {
        categoryId: String, // category that parts belong to
        positions: [], // part ids in array
      },
    ],
    imageOrder: [ // array of imageOrder objects for each part
      {
        partId: String, // part that images belong to
        positions: [], // image urls in array
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("position", positionSchema, "positions");
