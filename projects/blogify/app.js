require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Redis = require("ioredis"); // Import Redis

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;


const redis = new Redis(); // Defaults to localhost:6379

redis.on("connect", () => {
  console.log("🟢 Connected to Redis!");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});


app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`🚀 Server Started at PORT: ${PORT}`));
