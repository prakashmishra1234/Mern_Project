import React from "react";
import { EditorState, convertToRaw } from "draft-js";
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
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const html = stateToHTML(editorState.getCurrentContent());
    setState(html);
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
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
    />
  );
};
