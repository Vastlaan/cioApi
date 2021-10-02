const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { users } = require("./data");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  const { id } = req.query;

  console.log(id);

  res.download(path.join(__dirname, "data", "photos", id));
});

app.post("/api/fetchPhoto", (req, res) => {
  const { email, veryficationCode } = req.body;
  console.log(email, veryficationCode, users);

  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "The email is required",
      field: "email",
    });
  }
  if (!veryficationCode) {
    return res.status(400).json({
      status: "error",
      message: "The veryfication code is required",
      field: "veryfication_code",
    });
  }

  const validUser = users.find(
    (user) => user.email === email && user.veryficationCode === veryficationCode
  );

  if (!validUser) {
    return res.status(404).json({
      status: "error",
      message: "Invalid credentials",
      field: "general",
    });
  }

  res.status(200).json({ status: "success", user: validUser });
});

app.listen(5199, () => {
  console.log(`App is listening on port 5199`);
});
