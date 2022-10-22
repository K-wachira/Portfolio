import React from "react";
import { useState } from "react";
import TagsInput from "react-tagsinput";
import axios from "axios";

import "react-tagsinput/react-tagsinput.css";

function Forms(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [tags, setTags] = useState(Object.values(props.tags));
  const [category, setCategory] = useState(props.category);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const handleSubmit = (e) => {
    if (!isSelected) {
      props.handleForm({ title, description, tags, category });
      e.preventDefault();
    }
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = {"uploaded_file": selectedFile, post_id: "635159869e6e5abdcfe0a33b"};
    axios
      .post("http://localhost:5000/api/v1/blog/upload-cover", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      setIsSelected(false)
  };

  return (
    <div className="bg-light p-4">
      <form
        className=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control mt-2"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label>Description</label>
          <textarea
            className="form-control mt-2"
            name="description"
            type="text-area"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="mt-4">
          <label>Tags</label>
          <TagsInput
            className="form-control mt-2"
            value={tags}
            onChange={setTags}
          />
        </div>
        <div className="form-group mt-4">
          <label>Category:</label>
          <input
            className="form-control mt-2"
            name="category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>

        <div>
          <input type="file" name="file" onChange={changeHandler} />
          {isSelected ? (
            <div>
              <p>Size in bytes: {selectedFile.size / 1000}</p>

              <button onClick={handleSubmission}>Submits</button>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </div>
        <div className="actions mt-4 d-grid">
          <input
            type="submit"
            value="Update"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
}

export default Forms;
