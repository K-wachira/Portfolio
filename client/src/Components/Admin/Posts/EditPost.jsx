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
const EditPost = (props) => {
  const initialPostState = {
    _id: null,
    title: "",
    description: "",
    category: "",
    tags: [],
    elements: [{}],
  };
  const [post, setPost] = useState([]);
  const params = useParams();

  useEffect(() => {
    getPost(params.post_id);
  }, []);

  const notify = (props) => {
    console.log(props.value);
    let options = {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    };
    switch (props.value) {
      case "Element Create":
        return toast.success("Element Created!", options);
      case "Element Update":
        return toast.success("Element Updated!", options);
      case "Element Delete":
        return toast.success("Element Deleted!", options);
      case "Element Hide":
        return toast.success("Element Hidden!", options);
      case "Element Unhide":
        return toast.success("Element Visible", options);
      case "Post Update":
        return toast.success("Post Updated!", options);
      case "Post Publish":
        return toast.success("Post Published!", options);
      case "Post Unpublish":
        return toast.success("Post Unpublished!", options);
      default:
        return toast.warn("Did not excecute cases", options);
    }
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
    console.log("post", post);
    let obj = { ...log, ...id };
    PostDataService.updatePost(obj)
      .then((response) => {
        notify({ value: "Post Update" });
        getPost(post._id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  props = {
    handleForm: handleForm,
    title: post.title,
    description: post.description,
    tags: post.tags,
    category: post.category,
  };

  const handleElementUpdate = (data) => {
    ElementDataService.updateElement(data)
      .then((response) => {
        post.elements[data.element_index].body = data.body;
        getPost(post._id);
        notify({ value: "Element Update" });
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
        notify({ value: "Element Create" });
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
    notify({ value: "Element Create" });
  }

  return (
    <div className="container pt-5">
      {post._id ? (
        <div className="container pt-5">
          <Link to={"/Posts"} className="btn btn-primary mx-4 mb-1">
            All Posts
          </Link>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-body"> Editing Post</h4>
                  <Forms {...props} />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex bd-highlight">
                    <h3 className="p-2 bd-highlight">
                      <i
                        onClick={() => {
                          createElement(post._id);
                        }}
                        className="bi bi-paragraph"
                      ></i>
                    </h3>
                    <h3 className="p-2 bd-highlight">
                      <i className="bi bi-card-image"></i>
                    </h3>
                  </div>
                  <div className="bg-light">
                    {post.elements.map((element, key) => {
                      return (
                        <div className="mb-2 p-3 paragraph " key={key}>
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
