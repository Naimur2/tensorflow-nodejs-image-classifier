const keras = require('../lib/keras');

const getResult = async (req, res, next) => {
    console.log(req);
    const { filename } = req.file;

    try {
        const Image = await keras.preprocessImage.VGG16(`files/${filename}`);
        const result = await keras.predict(Image, 'vgg16/model.json');
        console.log(result);
        req.prediction = result;
        next();
    } catch (err) {
        res.status(500).json({ error: 'There was a server side error!' });
    }
};

module.exports = getResult;
