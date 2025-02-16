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
  try {
    
    const cachedBlogs = await redis.get("allBlogs");

    if (cachedBlogs) {
      console.log("⚡ Served from Redis Cache");
      return res.render("home", {
        user: req.user,
        blogs: JSON.parse(cachedBlogs),
      });
    }

   
    const allBlogs = await Blog.find({});
    
   
    await redis.set("allBlogs", JSON.stringify(allBlogs), "EX", 60);

    console.log("🆕 Fetched from MongoDB and Cached");

    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`🚀 Server Started at PORT: ${PORT}`));
