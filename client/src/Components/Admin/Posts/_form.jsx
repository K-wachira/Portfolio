import React from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Forms(props) {
  const [elementBody, setElementBody] = useState(props.body);
  const [elementIndex, setElementIndex] = useState(props.element_index);
  const [post_id, setPostId] = useState(props.post_id);

  const handleSubmit = (e) => {
    try {
      props.handleSubmit({ elementBody, elementIndex, post_id });
      e.preventDefault();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="container bg-light">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="form-group">
          <textarea
            className="form-control"
            name="elementBody"
            type="text-area"
            value={elementBody}
            onChange={(event) => setElementBody(event.target.value)}
          />
        </div>

        <div className="actions m-1">
          <div className="d-flex flex-row bd-highlight">
            <div className="p-1 bd-highlight">
              <input
                type="submit"
                value="Save"
                className="btn btn-primary btn-block"
              />
            </div>
            <div className="p-1 bd-highlight">
              <i className="cancel btn btn-secondary bi bi-x-lg"></i>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Forms;
