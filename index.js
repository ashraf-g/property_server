const express = require("express");
const cors = require("cors");
const path = require("path");

const corsOptions = {
  origin: "*",
};

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "./app/uploads")));

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to server." });
});

require("./app/routes/user.route")(app);
require("./app/routes/property.route")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
