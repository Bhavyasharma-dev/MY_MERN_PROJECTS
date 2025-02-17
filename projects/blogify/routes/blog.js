
// blog.js
const { Router } = require("express");
const multer = require("multer");
const path = require("path");

// Import the Redis client from services
const redis = require("../services/redisclient");

const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user"); // Import User model

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  try {
    // Fetch blog and comments in parallel
    const [blog, comments] = await Promise.all([
      Blog.findById(req.params.id),
      Comment.find({ blogId: req.params.id }),
    ]);

    // Query users only if you need detailed user information
    const userIds = comments.map(comment => comment.createdBy); // Collect user IDs
    const users = await User.find({ _id: { $in: userIds } });

    // Create a mapping of userId to user data for easy access
    const userMap = users.reduce((acc, user) => {
      acc[user._id.toString()] = user; // Map userId to user object
      return acc;
    }, {});

    // Attach user data to each comment
    comments.forEach(comment => {
      comment.createdBy = userMap[comment.createdBy.toString()];
    });

    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error("Error fetching blog or comments:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  // Clear the cache for blogs when a new comment is added
  await redis.del("allBlogs");

  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });

  // Clear the cache for blogs after creating a new blog
  await redis.del("allBlogs");

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;



