require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { createClient } = require("redis");

const Blog = require("./models/blog");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;


const redisClient = createClient({
  socket: {
    host: "127.0.0.1", 
    port: 6379, 
  },
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

(async () => {
  await redisClient.connect();
  console.log("🟢 Connected to Redis!");
})();

B
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
    const cacheKey = "allBlogs";
    
    
    const cachedBlogs = await redisClient.get(cacheKey);
    if (cachedBlogs) {
      console.log("⚡ Served from Redis Cache");
      return res.render("home", {
        user: req.user,
        blogs: JSON.parse(cachedBlogs),
      });
    }


    const allBlogs = await Blog.find({}).lean();


    await redisClient.setEx(cacheKey, 60, JSON.stringify(allBlogs));

    console.log("🆕 Fetched from MongoDB and Cached");

    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`🚀 Server Started at PORT: ${PORT}`));
