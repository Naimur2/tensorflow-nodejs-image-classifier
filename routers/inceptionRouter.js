/* eslint-disable prettier/prettier */
const express = require("express");

const router = express.Router();
const result = require("../middleware/getInceptionPrediction");
const uploads = require("../middleware/uploadFile");

router.get("/", (req, res) => {
    res.status(200).json({ result: "ok", message: "success" });
});

router.post("/", uploads.single("data"), result, (req, res) => {
    res.status(200).json({ result: req.prediction, message: "success" });
});

module.exports = router;
