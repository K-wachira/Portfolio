import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
let posts;

export default class PostsDAO {
  static async injectDB(conn) {
    if (posts) {
      return;
    }
    try {
      posts = await conn.db(process.env.BLOG_NS).collection("posts");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in postsDAO: ${e}`
      );
    }
  }

  static async createNewPost(post) {
    try {
      const results = await posts.insertOne(post);
      return results;
    } catch (e) {
      console.log(e.message);
    }
  }

  static async getPosts({ filters = null, page = 0, postsPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor;

    try {
      cursor = await posts.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { postsList: [], totalNumPosts: 0 };
    }

    const displayCursor = cursor.limit(postsPerPage).skip(postsPerPage * page);

    try {
      const postsList = await displayCursor.toArray();
      const totalNumPosts = await posts.countDocuments(query);

      return { postsList, totalNumPosts };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { postsList: [], totalNumPosts: 0 };
    }
  }

  static async getPostByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "posts",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$posts_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "posts",
          },
        },
        {
          $addFields: {
            posts: "$posts",
          },
        },
      ];
      return await posts.aggregate(pipeline).next();
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
      return await posts.updateOne(
        { _id: ObjectId(post_id) },
        { $set: { elements: elementsArray } }
      );
    } catch (e) {
      console.error(`Something went wrong in updating elements index: ${e}`);
      throw e;
    }
    2;
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
      const updateResponse = await posts.updateOne(
        { _id: ObjectId(update_data.post_id) },
        {
          $set: {
            title: update_data.title,
            description: update_data.description,
            cover_image: update_data.cover_image,
            category: update_data.category,
            tags: update_data.tags,
            updated_at: update_data.updated_at,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update post: ${e}`);
      return { error: e };
    }
  }

  static async pusblishPostById(publish_data) {
    console.log(publish_data);
    try {
      const updateResponse = await posts.updateOne(
        { _id: ObjectId(publish_data.post_id) },
        {
          $set: {
            published: true,
            published_at: publish_data.published_at,
          },
        }
      );
      console.log(updateResponse);
      return updateResponse;
    } catch (e) {
      console.error(`Unable to publish post: ${e}`);
      return { error: e };
    }
  }

  static async deletePostById(post_id) {
    try {
      const deletePost = await posts.deleteOne({
        _id: ObjectId(post_id),
      });
      return deletePost;
    } catch (e) {
      console.log(e);
    }
  }
}
