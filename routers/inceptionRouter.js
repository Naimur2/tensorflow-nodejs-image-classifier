/* eslint-disable prettier/prettier */
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const result = require("../middleware/getInceptionPrediction");
const uploads = require("../middleware/uploadFile");

router.get("/", (req, res) => {
    res.status(200).json({ result: "ok", message: "success" });
});

const deleteFile = async (req, res, next) => {
    try {
        const { filename, destination } = req.file;
        await fs.unlink(path.join(destination, filename), () => {
            console.log("deleted");
        });
        next();
    } catch (error) {
        console.log(error);
        throw new Error("SomeThing Went wrong");
    }
};

router.post("/", uploads.single("data"), result, deleteFile, (req, res) => {
    try {
        res.status(200).json({ result: req.prediction, message: "success" });
    } catch (error) {
        res.status(500).json({ error: "surver error" });
    }
});

module.exports = router;
