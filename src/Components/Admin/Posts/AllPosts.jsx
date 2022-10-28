import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../Services/posts.service.js";
import Loading from "../../Shared/Loading.jsx";
import NetworkError from "../../Shared/NetworkError.jsx";

import moment from "moment";
import Notifier from "../../Shared/Notifier.jsx";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [networkBreak, setNetworkBreak] = useState(false);
  const image =
    "https://blogimagebucket.s3.eu-west-2.amazonaws.com/Shani.png";

  useEffect(() => {
    retrievePosts();
    // retrievCategories();
  }, []);

  const async retrievePosts = () => {
    await PostDataService.getAll()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
        if (error.message === "Network Error") {
          setNetworkBreak(true);
        }
      });
  };

  const async createNewPost = () => {
    await PostDataService.createPost()
      .then((response) => {
        Notifier({ value: "success", message: "New Post Created" });
        retrievePosts();
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
        if (error.message === "Network Error") {
          setNetworkBreak(true);
        }
      });
  };

  const async deletePost = (id) => {
    await PostDataService.deletePost({ post_id: id })
      .then((response) => {
        Notifier({ value: "success", message: "Post Deleted" });
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
        if (error.message === "Network Error") {
          setNetworkBreak(true);
        }
      });
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
                <div className="card bg-light mb-3 rounded-3  d-flex flex-column" key={key}>
                  <div className="row g-0">
                    <div className="col-md-4 ">
                      <img
                        src={
                          post.cover_image == null ? image : post.cover_image
                        }
                        alt=""
                        className="post-image img-thumbnail rounded"
                      />
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

                          <small class="text-muted mt-auto">
                            Last updated{" "}
                            <span> {moment(post.updatedAt).fromNow()}</span>
                          </small>

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
            {networkBreak ? <NetworkError /> : <Loading />}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
