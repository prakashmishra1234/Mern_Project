import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ICustomEditor {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export const CustomEditor: React.FC<ICustomEditor> = ({ state, setState }) => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const [editorHeight, setEditorHeight] = React.useState<string>("");

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const html = stateToHTML(editorState.getCurrentContent());
    setState(html);
  };

  const handleSize = () => {
    const toolbarElements = document.getElementsByClassName("toolbarClassName");
    const toolarWrapperElement =
      document.getElementsByClassName("rdw-editor-wrapper");
    let toolbarHeight = 0;
    let toolbarWrapperHeigth = 0;
    if (toolbarElements.length > 0) {
      const toolbarElement = toolbarElements[0];
      toolbarHeight = toolbarElement.clientHeight;
    }
    if (toolarWrapperElement.length > 0) {
      const toolBarWrapperElement = toolarWrapperElement[0];
      toolbarWrapperHeigth = toolBarWrapperElement.clientHeight;
    }
    const newEditorHeight = toolbarWrapperHeigth - toolbarHeight;
    setEditorHeight(`${newEditorHeight}px`);
    const editorEle = document.querySelector(
      ".DraftEditor-root"
    ) as HTMLElement;
    if (editorEle) {
      editorEle.style.height = `calc(100% - 14px)`;
    }
  };

  React.useLayoutEffect(() => {
    handleSize();

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const editorStyle = {
    overflow: "auto",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    height: editorHeight,
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "embedded",
          "emoji",
          "image",
          "remove",
          "history",
        ],
        inline: { inDropdown: false },
        list: { inDropdown: false },
        textAlign: { inDropdown: false },
        link: { inDropdown: false },
        history: { inDropdown: false },
      }}
      editorStyle={editorStyle}
    />
  );
};
