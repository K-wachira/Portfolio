import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../Services/posts.service.js";
import Loading from "../../Shared/Loading.jsx";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    retrievePosts();
    // retrievCategories();
  }, []);

  const retrievePosts = () => {
    PostDataService.getAll()
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const retrievCategories = () => {
  //   PostDataService.getCategories()
  //     .then((response) => {
  //       console.log(response.data);
  //       setCategories(["All Categories"].concat(response.data));
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const refreshList = () => {
    retrievePosts();
  };

  return (
    <div>
      {posts.length ? (
        <div className="container">
          <h4 className="d-flex justify-content-between mb-4">
            <span> Posts </span>
            <button className="btn btn-primary"> New Post </button>
          </h4>
          {posts.map((post, key) => {
            return (
              <div className="card bg-light mb-3 rounded-3" key={key}>
                <div className="card-body">
                  <h5 className="card-title md-1 text-dark">{post.title}</h5>
                  <p className="text-secondary mb-0">{post.description}</p>
                  <Link
                    to={"/editPost/" + post._id}
                    className="btn btn-primary col-lg-5 mx-1 mb-1"
                  >
                    View Post
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="container">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default PostList;
