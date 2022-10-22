import React, { useState, useEffect } from "react";
import Forms from "./TitleForm.jsx";
// import Editor from "./_form.jsx";
import PostDataService from "../Services/posts.service.js";
import ElementDataService from "../Services/elements.service.js";
import Editor from "./RichEditor.jsx";
import { useParams, Link } from "react-router-dom";
import Loading from "../../Shared/Loading.jsx";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const EditPost = (props) => {
  const [post, setPost] = useState([]);
  const params = useParams();

  useEffect(() => {
    getPost(params.post_id);
  }, []);

  const notify = (props) => {
    let options = {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    };

    const notifiers = {
      1: "Element Created",
      2: "Element Updated!",
      3: "Element Deleted!",
      4: "Element Hidden!",
      5: "Element Visible!",
      6: "Elements Rearranged!",
      7: "Post Updated!",
      8: "Post Publish!",
      9: "Post Unpublished!",
    };

    props.value in Object.keys(notifiers)
      ? toast.success(notifiers[props.value], options)
      : toast.warn("Did not excecute cases", options);
  };

  const getPost = (id) => {
    PostDataService.get(id)
      .then((response) => {
        setPost(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleForm = (log) => {
    console.log("Log data: ", log);
    const id = {
      post_id: post._id,
    };
    let obj = { ...log, ...id };
    PostDataService.updatePost(obj)
      .then((response) => {
        notify({ value: 7 });
        getPost(post._id);
      })
      .catch((e) => {
        console.log(e);
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
        data.flag ? notify({ value: 8 }) : notify({ value: 9 });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleElementUpdate = (data) => {
    ElementDataService.updateElement(data)
      .then((response) => {
        post.elements[data.element_index].body = data.body;
        getPost(post._id);
        notify({ value: 2 });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function createElement(post_id) {
    const data = {
      post_id: post_id,
      element_index: post.elements.length,
    };
    ElementDataService.createElement(data)
      .then((response) => {
        notify({ value: 1 });
        getPost(post._id);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function deleteElement(element_index, post_id) {
    const data = {
      post_id: post_id,
      element_index: element_index,
    };
    ElementDataService.deleteElement(data)
      .then((response) => {
        notify({ value: "Element Delete" });
        getPost(post._id);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function test() {
    notify({ value: 1 });
  }

  return (
    <div className="container pt-5">
      {post._id ? (
        <div className="container pt-5">
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
                      createElement(post._id);
                    }}
                    className="bi bi-paragraph"
                  ></i>
                </h3>
                <h3 className="bd-highlight">
                  <i className="bi bi-card-image"></i>
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
                    <h6 className="fw-bold mb-0 text-end">Unpublished</h6>
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
                          <div className="mb-2 p-2 paragraph " key={key}>
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
                                <div>
                                  <p>{parse(element.body)}</p>
                                </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <Loading />
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
