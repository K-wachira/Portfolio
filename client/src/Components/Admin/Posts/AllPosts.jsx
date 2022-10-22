import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../Services/posts.service.js";
import Loading from "../../Shared/Loading.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const image =
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80";
  const notify = (props) => {
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
        setPosts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createNewPost = () => {
    PostDataService.createPost()
      .then((response) => {
        notify({ value: "Post Create" });
        retrievePosts();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePost = (id) => {
    PostDataService.deletePost({ post_id: id })
      .then((response) => {
        notify({ value: "Post Create" });
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
                <div className="card bg-light mb-3 rounded-3 " key={key}>
                  <div className="row g-0">
                    <div className="col-md-4 ">
                      <img src={image} alt="" className="img-fluid" />
                    </div>

                    <div className="col-md-8">
                      <div className="row mt-2">
                        <div className="col-md-6">
                          {post.published ? (
                            <span class="m-2 badge bg-primary">Published</span>
                          ) : (
                            <h6 className="m-2 badge bg-secondary">
                              Unpublished
                            </h6>
                          )}
                        </div>
                        <div className="col-md-6 text-end">
                          <div className="d-flex flex-row-reverse bd-highlight">
                            <div className="p-2 bd-highlight">
                              <i
                                onClick={() => {
                                  deletePost(post._id);
                                }}
                                className="cancel bi bi-trash"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <h2 className="card-title text-dark fw-bold">
                          {post.title}
                        </h2>
                        <p className="card-text mb-0">{post.description}</p>
                        <p class="card-text ">
                          <small class="text-muted">
                            Last updated{" "}
                            <span> {moment(post.updatedAt).fromNow()}</span>
                          </small>
                        </p>

                        <Link
                          to={"/editPost/" + post._id + "/edit"}
                          state={{ from: "path", id: post._id }}
                          post={post._id}
                          className="stretched-link"
                        ></Link>
                      </div>
                    </div>
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
