import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import moment from "moment";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Notifier from "../../Shared/Notifier.jsx";
import PostDataService from "../../Admin/Services/posts.service.js";
import Loading from "../../Shared/Loading.jsx";
import NetworkError from "../../Shared/NetworkError.jsx";
import TagsInput from "react-tagsinput";

const BlogPost = (props) => {
  const [networkBreak, setNetworkBreak] = useState(false);
  const [post, setPost] = useState([]);
  const [date, setDate] = useState();
  const params = useParams();
  const image = "https://blogimagebucket.s3.eu-west-2.amazonaws.com/Shani.png";
  useEffect(() => {
    getPost(params.post_id);
  }, []);

  const getPost = (id) => {
    PostDataService.get(id)
      .then((response) => {
        setPost(response.data);
        var date = new Date(response.data.created_at);

        setDate(date.toDateString());
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
        if (error.message === "Network Error") {
          setNetworkBreak(true);
        }
      });
    console.log(post);
  };
  return (
    <div className="container pt-5 mb-5  ">
      {post._id ? (
        <div class="row py-5">
          <div class="col py-5">
            <div class="card border-0 fs-5 ">
              <h1 class="card-title h1">{post.title}</h1>
              <p className="mt-4"> {date} </p>
              <hr />
              <div class="card-header border-0 mt-3">
                <img
                  src={post.cover_image == null ? image : post.cover_image}
                  alt=""
                  className="rounded-3 mw-100"
                />
              </div>

              <div class="card-body readers-posts-show">
                <div class="pl-5 pr-5 pt-4 pb-2 mt-5">
                  {post.elements
                    .sort((a, b) =>
                      a.element_index > b.element_index ? 1 : -1
                    )
                    .map((element, key) => {
                      return (
                        <div key={key}>
                          {element.element_type === "Image" ? (
                            <div class="image-element mb-2">
                              <img
                                src={element.body}
                                alt=""
                                className=" mw-10 mh-10 img-thumbnail"
                              />
                            </div>
                          ) : (
                            <div class="content-element mb-4">
                              <p>{parse(element.body)}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
                <hr />
                <div className="mt-4">
                  <TagsInput
                    className="mt-2"
                    value={post.tags}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          {networkBreak ? <NetworkError /> : <Loading />}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
