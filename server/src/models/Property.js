import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
      type: String,
      required: true,
    },
  address: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const PropertyModel = mongoose.model("Property", propertySchema);
