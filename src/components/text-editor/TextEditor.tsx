import { EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorProps } from 'react-draft-wysiwyg';
import styles from './TextEditor.module.scss';
// eslint-disable-next-line import/order
import dynamic from 'next/dynamic';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={styles.wrapper}
        editorClassName={styles.editor}
        toolbarClassName={styles.toolbar}
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
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: false,
          },
        }}
      />
    </div>
  );
};
export default TextEditor;
