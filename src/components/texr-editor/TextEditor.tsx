import { EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './TextEditor.module.scss';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName={styles.wrapperClass}
      editorClassName={styles.editorClass}
      toolbarClassName={styles.toolbarClass}
      toolbar={{
        options: [
          'inline',
          'fontSize',
          'textAlign',
          'list',
          'link',
          'image',
          'emoji',
          'colorPicker',
        ],
        inline: { options: ['bold', 'italic', 'underline'] },
        textAlign: {
          options: ['left', 'center'],
        },
        list: {
          options: ['ordered'],
        },
        link: {
          options: ['link'],
        },
      }}
    />
  );
};

export default TextEditor;
