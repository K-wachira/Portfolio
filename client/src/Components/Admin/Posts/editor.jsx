import React, { Component, useState } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
var stateFromHTML = require("draft-js-import-html").stateFromHTML;

function PEditor(props) {
  const editorState = EditorState.createWithContent(
    ContentState.createFromText(props.body)
  );
  const [editorContent, setEditorContent] = useState(editorState);

  function onEditorStateChange(editorState) {
    setEditorContent(editorState);
  }

  const handleSubmit = (e) => {
    try {
      props.handleSubmit({ editorState });
      e.preventDefault();
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <Editor
            editorState={editorContent}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <p></p>
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

export default PEditor;
