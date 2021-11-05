const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const result = require('../middleware/getPrediction');

const UPLOADS_FOLDER = './public/files/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${
            file.originalname.replace(fileExt, '').toLocaleLowerCase().split(' ').join('-') +
            Date.now()
        }-${fileExt}`;
        cb(null, fileName);
    },
});

const uploads = multer({
    storage,
});

router.get('/', (req, res) => {
    res.status(200).json({ result: 'ok', message: 'success' });
});

router.post('/', uploads.single('data'), result, (req, res) => {
    res.status(200).json({ result: req.prediction, message: 'success' });
});

module.exports = router;
