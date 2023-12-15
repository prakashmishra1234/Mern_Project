const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require("path");

const corsOptions = {
  origin: "*",
  Credential: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

if (process.env.NODE_ENV !== "PROD") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(
  express.json({
    limit: "50mb",
  })
);

//Route import
const user = require("./routes/userRoutes");
const country = require("./routes/countryRoutes");

app.use("/api/v1", user);
app.use("/api/v1", country);
app.set("trust proxy", 1);

// static file
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.use(errorMiddleware);

module.exports = app;
