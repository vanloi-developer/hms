const express = require("express");

const connectToDatabase = require("./database/dbConfig");
const user = require("./routes/user");
const role = require("./routes/role");
const room = require("./routes/room");
const area = require("./routes/area");
const hostel = require("./routes/hostel")

const errorMiddleware = require("./middlewares/error");
const cors = require("cors");

const app = express();

// CORS
app.use(cors());

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(400).send("Api working");
});

app.use("/user", user);

app.use("/role", role);

app.use("/area", area);

app.use("/room", room);

app.use("/hostel", hostel);



app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    errors: [
      {
        msg: "Route not found",
      },
    ],
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

connectToDatabase().then((_) => {
  app.listen(PORT, (_) => {
    console.log(`Server started on port ${PORT}`);
  });
});
