const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./models/Db");
connectDB();

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 2040;

const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    Jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          result: "Please provide a valid token!",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({
      message: "Access denied! Please add token with the header",
    });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "./public/images"),
      function (error, success) {
        if (error) {
          throw error;
        }
      }
    );
  },

  filename: function (req, file, cb) {
    const NAME = Date.now() + "-" + file.originalname;
    cb(null, NAME, function (error, success) {
      if (error) {
        throw error;
      }
    });
  },
});

const upload = multer({ storage: storage });

// Routes
const { AddUser } = require("./controllers/AddUser");
const { SignIn } = require("./controllers/SignIn");
const { VerifyEmail } = require("./controllers/VerifyEmail");
const { SendEmail } = require("./controllers/SendEmail");
const { UpdateUser } = require("./controllers/UpdateUser");
const { GetUser } = require("./controllers/GetUser");
const { AddRecipe } = require("./controllers/AddRecipe");
const { GetRecipes } = require("./controllers/GetRecipes");
const { DeleteRecipe } = require("./controllers/DeleteRecipe");
const { GetFreshRecipes } = require("./controllers/GetFreshRecipes");
const { AddStar } = require("./controllers/AddStar");
const { RemoveStar } = require("./controllers/RemoveStar");
const { GetPopularRecipes } = require("./controllers/GetPopularRecipes");
const { GetAllRecipes } = require("./controllers/GetAllRecipes");

app.get("/", (req, res) => {
  res.send("Baby's Recipe Backend");
});
app.post("/register", AddUser);
app.post("/verifyemail", VerifyEmail);
app.post("/signIn", SignIn);
app.post("/send_email", SendEmail);
app.post("/update_user", verifyToken, upload.single("avatar"), UpdateUser);
app.post("/add_recipe", verifyToken, upload.single("recipe_image"), AddRecipe);
app.post("/get_user", verifyToken, GetUser);
app.post("/get_recipes", verifyToken, GetRecipes);
app.post("/getAllRecipes", verifyToken, GetAllRecipes);
app.post("/delete_recipe", verifyToken, DeleteRecipe);
app.post("/get_fresh_recipes", verifyToken, GetFreshRecipes);
app.post("/add_star", verifyToken, AddStar);
app.post("/remove_star", verifyToken, RemoveStar);
app.post("/get_popular_recipes", verifyToken, GetPopularRecipes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
