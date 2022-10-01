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
  
    createPost(data) {
      return http.post("/new_post", data);
    }
  
    updatePost(data) {
      return http.put("/post", data);
    }
  
    deletePost(id, userId) {
      return http.delete(`/post?post_id=${id}`, {data:{user_id: userId}});
    }
  
    getCategories(id) {
      return http.get(`/categories`);
    }
  
  }
  
  export default new PostDataService();