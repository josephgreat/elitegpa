const express = require("express");
// const axios = require('axios');
// const cheerio = require('cheerio');
// const { default: puppeteer } = require('puppeteer');
const LevelModel = require("../models/gpaSchema");

const router = express.Router();

router.post("/save-session-detail", async (req, res) => {
  const { level, session, semesters, uid } = req.body;
  const data = new LevelModel({
    level,
    session,
    semesters,
    uid
  });

  try {
    const existingData = await LevelModel.findOne({ level: data.level, uid: data.uid });
    if (existingData) {
      return res.status(409).json({
        error: "Duplicate Data",
        message: `Data for ${data.level} already exists.`,
      });
    } else {
      const dataToSave = await data.save();
      return res.status(200).json(dataToSave);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/get-all-sessions/:uid", async (req, res) => {
  try {
    const data = await LevelModel.find({uid: req.params.uid});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/get-one-session/:id", async (req, res) => {
  try {
    const singleData = await LevelModel.findOne({ _id: req.params.id });
    res.json(singleData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // res.send("Get by ID API");
});

//Update by ID Method
router.patch("/update-one-session/:id", async(req, res) => {
  try {
    const singleData = await LevelModel.updateOne({ _id: req.params.id }, req.body);
    res.json(singleData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete-one-session/:id", async (req, res) => {
  try {
    const singleData = await LevelModel.deleteOne({ _id: req.params.id });
    res.json(singleData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
