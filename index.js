/* eslint-disable prettier/prettier */
const express = require("express");
const cors = require("cors");


const app = express();

const testRouter = require("./routers/testRouter");
const inceptionRouter = require("./routers/inceptionRouter");



app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/vgg", testRouter);

app.use("/inception", inceptionRouter);

const errorHandler = (err, req, res, next) => {
    if (req.headerSent) {
        return next(err);
    }
    return res.status(500).json({ error: err });
};


app.listen(4000, () => {
    console.log("App Started at port localhost:4000");
});
