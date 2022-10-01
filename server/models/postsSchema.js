import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    reqired: true,
  }, // String is shorthand for {type: String}
  description: {
    type: String,
    reqired: true,
  },
  cover_image: String,
  tags: [String],
  category: {
    type: String,
    reqired: true,
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: () => Date.now(),
  },
  published_at: Date,
  published: {
    type: Boolean,
    default: false,
  },
  elements: [
    {
      element_index: Number,
      element_type: String,
      body: String,
      created_at: Date,
      updated_at: {
        type: Date,
        default: () => Date.now(),
      },
      hidden: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export default mongoose.model("posts", postSchema);
// module.exports = mongoose.model("Post", postSchema)
