import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import moment from "moment";
import axios from "axios";
import Editor from "./RichEditor.jsx";
import { useParams, Link } from "react-router-dom";
import Forms from "./TitleForm.jsx";
import Notifier from "../../Shared/Notifier.jsx";
import PostDataService from "../Services/posts.service.js";
import ElementDataService from "../Services/elements.service.js";
import Loading from "../../Shared/Loading.jsx";
import NetworkError from "../../Shared/NetworkError.jsx";

const EditPost = (props) => {
  const [networkBreak, setNetworkBreak] = useState(false);

  const [post, setPost] = useState([]);
  const [imageUpload, setImageUplaod] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const params = useParams();

  useEffect(() => {
    getPost(params.post_id);
  }, []);

  const getPost = (id) => {
    PostDataService.get(id)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
        if (error.message === "Network Error") {
          setNetworkBreak(true);
        }
      });
  };

  const handleForm = (log) => {
    const id = {
      post_id: post._id,
    };
    let obj = { ...log, ...id };
    PostDataService.updatePost(obj)
      .then((response) => {
        Notifier({ value: "success", message: "Post Updated" });
        getPost(post._id);
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
      });
  };

  const publish = () => {
    var data = {
      flag: post.published ? false : true,
      post_id: post._id,
    };
    PostDataService.publishToggle(data)
      .then((response) => {
        getPost(post._id);
        data.flag
          ? Notifier({ value: "success", message: "Post Published" })
          : Notifier({ value: "success", message: "Post Unpublished" });
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
      });
  };

  const handleElementUpdate = (data) => {
    ElementDataService.updateElement(data)
      .then((response) => {
        post.elements[data.element_index].body = data.body;
        getPost(post._id);
        Notifier({ value: "success", message: "Element Updated" });
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
      });
  };

  function createElement() {
    console.log("Ack")
    const data = {
      post_id: post._id,
      element_index: post.elements.length,
    };
    ElementDataService.createElement(data)
      .then((response) => {
        console.log(response)
        Notifier({ value: "success", message: "Elements Created" });
        getPost(post._id);
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
      });
  }

  function createImageElement() {
    setImageUplaod(imageUpload ? false : true);
    setIsSelected(imageUpload ? false : true);
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = {
      uploaded_file: selectedFile,
      post_id: post._id,
      element_index: post.elements.length,
      element_type: "Image",
    };
    axios
      .post(
        "http://portfoliobackend-env.eba-ek73xxps.eu-west-2.elasticbeanstalk.com/api/v1/blog/element-image-upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((result) => {
        Notifier({ value: "success", message: "Image Added!!!" });
        getPost(post._id);
        setImageUplaod(false);
        setIsSelected(false);
        setSelectedFile();
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
      });
    setIsSelected(false);
  };

  function deleteElement(element_index, post_id) {
    const data = {
      post_id: post_id,
      element_index: element_index,
    };
    ElementDataService.deleteElement(data)
      .then((response) => {
        getPost(post._id);
        Notifier({ value: "success", message: "Element Deleted" });
      })
      .catch((error) => {
        Notifier({ value: "warn", message: error.message });
      });
  }

  function test() {
    Notifier({ value: "success", message: "Test function clicked" });
  }

  return (
    <div className="container pt-5 mb-5">
      {post._id ? (
        <div className="container pt-5 mb-5">
          <div className="row">
            <div className="col-md-4">
              <div className=" d-flex bd-highlight mb-4">
                <Link to={"/Posts"} className="btn btn-secondary mb-1">
                  Back
                </Link>
              </div>
              <div className="card border">
                <div className="card-header">
                  <h6 className="fw-bold mb-0"> Editing Post</h6>
                </div>
                <div className="card-text">
                  <Forms handleForm={handleForm} {...post} />
                </div>
                <div className="container d-grid mb-4">
                  <div
                    onClick={() => {
                      publish();
                    }}
                    className="btn btn-secondary btn-block"
                  >
                    {post.published ? (
                      <h6 className="mb-0">Unpublish</h6>
                    ) : (
                      <h6 className="mb-0 ">Publish</h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="d-flex bd-highlight mb-4">
                <h3 className="bd-highlight">
                  <i
                    onClick={() => {
                      createElement();
                    }}
                    className="bi bi-paragraph"
                  ></i>
                </h3>
                <h3 className="bd-highlight">
                  <i
                    onClick={() => {
                      createImageElement();
                    }}
                    className="bi bi-card-image"
                  ></i>
                </h3>
              </div>
              <div className="card border">
                <div className="card-header">
                  {post.published ? (
                    <h6 className="mb-0 text-end">
                      <span class="m-2 badge bg-primary">Published</span>
                      {/* <span className="fw-bold">Published </span>{" "} */}
                      {moment(post.published_at).fromNow()}
                    </h6>
                  ) : (
                    <h6 className="fw-bold mb0 text-end">Unpublished</h6>
                  )}
                </div>
                <div className="card-body bg-light">
                  <div className="bg-light">
                    {post.elements
                      .sort((a, b) =>
                        a.element_index > b.element_index ? 1 : -1
                      )
                      .map((element, key) => {
                        return (
                          <div className=" p-2 paragraph " key={key}>
                            <div className="m-2">
                              <div className="d-flex flex-row-reverse bd-highlight">
                                <div className="p-1 bd-highlight">
                                  <i
                                    onClick={() => {
                                      test();
                                    }}
                                    className="bi bi-chevron-compact-up "
                                  ></i>
                                </div>
                                <div className="p-1 bd-highlight">
                                  <i
                                    onClick={() => {
                                      test();
                                    }}
                                    className="bi bi-chevron-compact-down"
                                  ></i>
                                </div>
                                <div className="p-1 bd-highlight">
                                  {element.hidden ? (
                                    <i
                                      onClick={() => {
                                        test();
                                      }}
                                      className="bi bi-eye-slash"
                                    ></i>
                                  ) : (
                                    <i
                                      onClick={() => {
                                        test();
                                      }}
                                      className="bi bi-eye"
                                    ></i>
                                  )}
                                </div>
                              </div>
                              <div className="paragraph-content">
                                {element.element_type === "Image" ? (
                                  <div>
                                    <img
                                      src={element.body}
                                      alt=""
                                      className=" mw-10 mh-10 img-thumbnail"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <p>{parse(element.body)}</p>
                                  </div>
                                )}
                              </div>
                              <div className="paragraph-form  d-none">
                                <div>
                                  <div className="d-flex flex-row-reverse bd-highlight">
                                    <div className="p-2 bd-highlight">
                                      <i
                                        onClick={() => {
                                          deleteElement(
                                            element.element_index,
                                            post._id
                                          );
                                        }}
                                        className="cancel bi bi-trash"
                                      ></i>
                                    </div>
                                  </div>

                                  <Editor
                                    handleElementUpdate={handleElementUpdate}
                                    {...element}
                                    post_id={post._id}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    <div className="text-center">
                      {imageUpload ? (
                        <div>
                          <input
                            type="file"
                            name="file"
                            onChange={changeHandler}
                            label="New Cover"
                          />
                          {isSelected ? (
                            <div>
                              {/* <p>{selectedFile.size / 1000000} Mbs</p> */}
                              <button
                                className="btn btn-primary btn-block"
                                onClick={handleSubmission}
                              >
                                Upload
                              </button>
                            </div>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
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

document.addEventListener("click", (event) => {
  let element = event.target.closest(".paragraph-content");
  if (!element) return;
  element.classList.add("d-none");
  element.nextElementSibling.classList.remove("d-none");
});

document.addEventListener("click", (event) => {
  if (!event.target.matches(".cancel")) return;
  event.preventDefault();
  let element = event.target.closest(".paragraph-form");
  element.classList.add("d-none");
  element.previousElementSibling.classList.remove("d-none");
});

export default EditPost;
