import React, { FC, useEffect, useState } from 'react';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorProps, Editor } from 'react-draft-wysiwyg';

import styles from './TextEditor.module.scss';

type Props = {
  onChange?: (state: any) => void;
  defaultText?: string;
};

const TextEditor: FC<Props> = ({ defaultText, onChange }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const _contentState = ContentState.createFromText(defaultText || '');
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  return (
    <div>
      <Editor
        onChange={onChange}
        defaultContentState={contentState}
        onContentStateChange={setContentState}
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
