const keras = require('../lib/keras');

const getResult = async (req, res, next) => {
    const { filename } = req.file;

    try {
        const Image = await keras.preprocessImage.VGG16(`files/${filename}`);
        const result = await keras.predict(Image, 'vgg16/model.json');
        req.prediction = result;
        next();
    } catch (err) {
        throw new Error("SomeThing Went wrong");
    }
};

module.exports = getResult;
