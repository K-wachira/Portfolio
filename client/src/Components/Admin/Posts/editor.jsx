import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types"; // ES6

/*
 * Simple editor component that takes placeholder text as a prop
 */
class PEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: props.body };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    try {
      this.props.handleSubmit({
        body: this.state.editorHtml,
        post_id: this.props.post_id,
        element_index: this.props.element_index,
      });
    } catch (e) {
      alert(e);
    }
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className="container">
        <ReactQuill
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={PEditor.modules}
          formats={PEditor.formats}
        />
        <div className="actions m-1">
          <div className="d-flex flex-row bd-highlight">
            <div className="p-1 bd-highlight">
              <input
                onClick={() => {
                  this.handleSubmit();
                }}
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
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
PEditor.modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
PEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

/*
 * PropType validation
 */
PEditor.propTypes = {
  placeholder: PropTypes.string,
};

export default PEditor;
