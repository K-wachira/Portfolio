import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../../Admin/Services/posts.service.js";
import Loading from "../../Shared/Loading.jsx";
import NetworkError from "../../Shared/NetworkError.jsx";
import moment from "moment";
import Notifier from "../../Shared/Notifier.jsx";
import TextTruncate from "react-text-truncate"; // recommend
import UnderContruction from "../../Shared/Underdevelopment.jsx"

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [networkBreak, setNetworkBreak] = useState(false);
  const image = "https://blogimagebucket.s3.eu-west-2.amazonaws.com/Shani.png";

  useEffect(() => {
    retrievePosts();
    // retrievCategories();
  }, []);

  const retrievePosts = () => {
    PostDataService.getAll()
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

  return posts.length ? (
    <div className="container py-5">
      <div className="row py-5">
        {posts.map((post, key) => {
          return (
            <div className="col-md-6 col-lg-4 px-3  py-5 d-flex" key={key}>
              <div className="card border">
                <img
                  src={post.cover_image == null ? image : post.cover_image}
                  alt=""
                  className=" mt-2"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-text mt-4">
                    <strong>{post.title}</strong>{" "}
                  </h5>
                  <TextTruncate
                    line={5}
                    element="span"
                    truncateText="…"
                    text={post.description}
                  />
                  <Link
                    to={"/editPost/" + post._id + "/view"}
                    state={{ from: "path", id: post._id }}
                    post={post._id}
                    className="stretched-link"
                  ></Link>
                </div>
                  <div className="card-footer bg-white text-end ">
                    <small>
                      Published {moment(post.published_at).fromNow()}
                    </small>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="container">
      {networkBreak ? <NetworkError /> : <UnderContruction />}
    </div>
  );
}
export default BlogPosts;
