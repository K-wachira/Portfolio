import http from "../../../http-common";

class PostDataService {
  getAll(page = 0) {
    return http.get(`all_posts?page=${page}`);
  }

  get(id) {
    return http.get(`/post_by_id?post_id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`posts?${by}=${query}&page=${page}`);
  }

  createPost() {
    return http.post("/post");
  }

  publishToggle(data) {
    return http.post("/publish", data);
  }

  uploadCoverImage(data) {
    return http.post("/upload-cover", data);
  }

  updatePost(data) {
    return http.put("/post", data);
  }

  deletePost(data) {
    return http.delete("/post", {
      data: { post_id: data.post_id },
    });
  }

  getCategories(id) {
    return http.get(`/categories`);
  }
}

export default new PostDataService();
