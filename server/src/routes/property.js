import express from "express";
import mongoose from "mongoose";
import { PropertyModel } from "../models/Property.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await PropertyModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", verifyToken, async (req, res) => {
  const property = new PropertyModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    imageUrl: req.body.imageUrl,
    rent: req.body.rent,
    userOwner: req.body.userOwner,
  });
  console.log(property);

  try {
    const result = await property.save();
    res.status(201).json({
      createdProperty: {
        name: result.name,
        image: result.image,
        description: result.description,
        address: result.address,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});


router.get("/:propertyId", async (req, res) => {
  try {
    const result = await PropertyModel.findById(req.params.propertyId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  const property = await PropertyModel.findById(req.body.propertyID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedProperty.push(property);
    await user.save();
    res.status(201).json({ savedProperty: user.savedProperty});
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/savedProperty/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedProperty: user?.savedProperty });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/savedProperty/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedProperty = await PropertyModel.find({
      _id: { $in: user.savedProperty},
    });

    console.log(savedProperty);
    res.status(201).json({ savedProperty });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as propertyRouter };

