import React from "react";
import { useState } from "react";

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

        <div className="actions m-4 ">
          <input
            type="submit"
            value="Save"
            className="btn btn-primary btn-block"
          />
          <button className="cancel btn btn-secondary"> Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Forms;
