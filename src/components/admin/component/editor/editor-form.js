import React, { memo, useEffect } from "react";
import JoditEditor from "jodit-react";

const EditorForm = (props) => {
  // const editor = useRef(null);

  const config = {
    readonly: false,
  };

  useEffect(() => {
    return () => window.scrollTo(0, 439);
  });

  const validateEditor = (newContent) => {
    if (newContent === "") props.setMessContexErr("Không Để Trống Trường Này");
    else props.setMessContexErr("");
  };

  return (
    <JoditEditor
      id="editor"
      // ref={editor}
      value={props.content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => {
        props.setContent(newContent);
        validateEditor(newContent);
      }} // preferred to use only this option to update the content for performance reasons
      // onChange={(newContent) => props.setContent(newContent)}
    />
  );
};

export default memo(EditorForm);
