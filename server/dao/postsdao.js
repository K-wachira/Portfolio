import postModel from "../models/postModel.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

export default class PostsDAO {
  static async createNewPost(post) {
    try {
      const results_post = await postModel.create(post);
      return results_post;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getPosts({ filters = null, page = 0, postsPerPage = 20 } = {}) {
    try {
      const posts = postModel.find({}).sort({ createdAt: 1 });
      return posts;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getPostByID(id) {
    try {
      const single_post = postModel.findById(id);
      if (!single_post) {
        return { error: "Post Not Found" };
      } else {
        return single_post;
      }
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }

  static async getPostElements(post_id) {
    try {
      return await this.getPostByID(post_id);
    } catch (e) {
      console.error(`Something went wrong in getting post elements: ${e}`);

      throw e;
    }
    2;
  }

  static async updateElementIndex(post_id, elementsArray) {
    try {
      return await postModel.findOneAndUpdate(
        { _id: ObjectId(post_id) },
        { $set: { elements: elementsArray } }
      );
    } catch (e) {
      console.error(`Something went wrong in updating elements index: ${e}`);
      throw e;
    }
    2;
  }

  static async publishPost(post_id, flag) {
    try {
      return await postModel.findOneAndUpdate(
        { _id: ObjectId(post_id) },
        { $set: { published: flag, published_at: Date.now() } }
      );
    } catch (e) {
      throw e;
    }
  }

  static async getTags() {
    let tags = [];
    try {
      tags = await posts.distinct("tags");
      return tags;
    } catch (e) {
      console.error(`Unable to get tags, ${e}`);
      return tags;
    }
  }
  static async getCategories() {
    let categories = [];
    try {
      categories = await posts.distinct("categories");
      return categories;
    } catch (e) {
      console.error(`Unable to get categories, ${e}`);
      return categories;
    }
  }

  static async updatePostById(update_data) {
    try {
      const updateResponse = await postModel.findOneAndUpdate(
        { _id: ObjectId(update_data.post_id) },
        {
          $set: {
            title: update_data.title,
            description: update_data.description,
            cover_image: update_data.cover_image,
            category: update_data.category,
            tags: update_data.tags,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update post: ${e}`);
      return { error: e };
    }
  }

  static async deletePostById(post_id) {
    try {
      const deletePost = await postModel.findOneAndDelete({
        _id: ObjectId(post_id),
      });
      return deletePost;
    } catch (e) {
      console.log(e);
    }
  }
}
