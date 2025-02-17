const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      index: true,  // Add index to 'blogId' for faster querying by blog
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      index: true,  // Add index to 'createdBy' for faster filtering by author
    },
  },
  { timestamps: true }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;
