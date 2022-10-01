import React, { useState, useEffect } from "react";
import Forms from "./forms.jsx";
import PostDataService from "../Services/posts.service.js";
import { useParams, Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditPost = (props) => {
  const initialPostState = {
    _id: null,
    title: "",
    description: "",
    category: "",
    tags: [],
    elements: [],
  };
  const [post, setPost] = useState(initialPostState);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState();
  const [category, setCategory] = useState();
  const [post_id, setPostId] = useState();
  const [element_index, setElementIndex] = useState(0);
  const [element_body, setElementBody] = useState("");

  const params = useParams();

  const getPost = (id) => {
    PostDataService.get(id)
      .then((response) => {
        setPost(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setTags(response.data.tags);
        setCategory(response.data.category);
        setPostId(response.data._id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPost(params.post_id);
  }, [params.post_id]);

  const handleForm = (log) => {
    const id = {
      post_id: post_id,
    };
    let obj = { ...log, ...id };
    PostDataService.updatePost(obj)
      .then((response) => {
        getPost(post_id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  props = {
    handleForm: handleForm,
    title: title,
    description: description,
    tags: tags,
    category: category,
  };

  function elementEdit(element_index, element_body) {
    setElementIndex(element_index);
    setElementBody(element_body);
    console.log(element_body, element_index);
  }

  function test() {
    alert(element_body);
  }

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

  return (
    <div>
      {post._id ? (
        <div className="container">
          <Link to={"/Posts"} className="btn btn-primary   mx-1 mb-1">
            {" "}
            Back{" "}
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
              <button
                type="button"
                className="bi bi-paragraph btn-secondary m-3"
              >
                {" "}
                Palagraph{" "}
              </button>
              <div className="card">
                {post.elements.map((element, key) => {
                  return (
                    <div className="m-2" key={key}>
                      <div className="paragraph-content">
                        <p>{element.body}</p>
                      </div>
                      <div className="paragraph-form  d-none">
                        <p>{element.body}</p>
                        <textarea
                          className="form-control"
                          name="description"
                          type="text-area"
                          value={element_body}
                          onChange={(event) =>
                            setElementBody(event.target.value)
                          }
                        />
                        <div className="">
                          <button
                            onClick={() => test()}
                            className="btn btn-primary m-2"
                          >
                            {" "}
                            Save
                          </button>
                          <button className="cancel btn btn-secondary">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <br />
          <p>No post selected.</p>
        </div>
      )}
    </div>
  );
};

export default EditPost;
