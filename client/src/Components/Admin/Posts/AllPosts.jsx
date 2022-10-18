import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../Services/posts.service.js";
import Loading from "../../Shared/Loading.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);


    const notify = (props) => {
    console.log(props.value);
    let options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    };
    switch (props.value) {
      case "Post Create":
        return toast.success("New Post Created!", options);
      case "Post Delete":
        return toast.success("Post Deleted!", options);
      case "Post Publish":
        return toast.success("Post Published!", options);
      case "Post Unpublish":
        return toast.success("Post Unpublished!", options);
      default:
        return toast.warn("Did not excecute cases", options);
    }
  };
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

  const createNewPost = () => {
    console.log("New Post")
    PostDataService.createPost()
      .then((response) => {
        notify({value: "Post Create"})
        retrievePosts();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePosts();
  };

  return (
    <div>
      <div className="container pt-5">
        {posts.length ? (
          <div className="container pt-5">
            <h4 className="d-flex justify-content-between mb-4">
              <span> Posts </span>
              <button
                className="btn btn-primary"
                onClick={() => {
                  createNewPost();
                }}
              >
                {" "}
                New Post{" "}
              </button>
            </h4>
            {posts.map((post, key) => {
              return (
                <div className="card bg-light mb-3 rounded-3" key={key}>
                  <div className="card-body">
                    <h5 className="card-title md-1 text-dark">{post.title}</h5>
                    <p className="text-secondary mb-0">{post.description}</p>
                    <Link
                      to={"/editPost/" + post._id + "/edit"}
                      state={{ from: "path", id: post._id }}
                      post={post._id}
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
    </div>
  );
};

export default PostList;
