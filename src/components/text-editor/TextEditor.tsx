import React, { FC, useEffect, useState } from 'react';

import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorProps } from 'react-draft-wysiwyg';

import styles from './TextEditor.module.scss';

const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
  ssr: false,
});
type Props = {
  onChange?: (state: any) => void;
};

const TextEditor: FC<Props> = props => {
  const { onChange } = props;
  const handleChange = (state: any) => {
    console.log(state);
  };
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return (
    <div>
      <Editor
        onChange={handleChange}
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
TextEditor.defaultProps = {
  onChange: undefined,
};
export default TextEditor;
