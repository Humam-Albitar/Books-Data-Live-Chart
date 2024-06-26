const express = require("express");
const morganMiddleware = require("./middlewares/morgan");
const helmet = require("helmet");
const compression = require("compression");
const router = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(compression());
app.use(morganMiddleware);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
module.exports = app;
