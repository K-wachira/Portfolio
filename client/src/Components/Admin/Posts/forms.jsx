import React from "react";
import { useState } from "react";

function Forms(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [tags, setTags] = useState(props.tags);
  const [category, setCategory] = useState(props.category);
  const handleSubmit = (e) => {
    props.handleForm({ title, description, tags, category });
    e.preventDefault();
  };

  return (
    <div className="container bg-light">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            name="description"
            type="text-area"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <input
            className="form-control"
            name="tags"
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            className="form-control"
            name="category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>
        <div className="actions m-4 d-grid gap-2">
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
}

export default Forms;
