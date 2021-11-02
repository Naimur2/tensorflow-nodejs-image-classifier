const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const tfn = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');

const keras = require('./lib/keras');

const app = express();

app.use(cors());

const getResult = async (req, res, next) => {
    try {
        const Image = await keras.preprocessImage.VGG16('files/dog.jpg');
        const result = await keras.predict(Image, 'vgg16/model.json');
        console.log(result);
        req.prediction = result;
        next();
    } catch (err) {
        res.status(500).json({ error: 'There was aserver side error!' });
    }
};

app.get('/', getResult, async (req, res) => {
    try {
        res.status(200).json({ result: req.prediction, message: 'success' });
    } catch (err) {
        res.status(500).json({ error: 'There was aserver side error!' });
    }
});

const errorHandler = (err, req, res, next) => {
    if (req.headerSent) {
        return next(err);
    }
    return res.status(500).json({ error: err });
};

app.listen(8080, () => {
    console.log('App Started at port 8080');
});
