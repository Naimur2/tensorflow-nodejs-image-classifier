const keras = require("../lib/keras");
const diseases = require("./diseases");

const getResult = async (req, res, next) => {
    const { filename } = req.file;
    try {
        const Image = await keras.preprocessImage.mobileNET(`files/${filename}`);
        let result = await keras.predict(Image, "inception/model.json");

        result = result.map((item) => {
            return {
                probablity: item.probablity,
                classname: diseases.diseaseNames[item.classname],
            };
        });
        req.prediction = result;
        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "There was a server side error!" });
    }
};

module.exports = getResult;
