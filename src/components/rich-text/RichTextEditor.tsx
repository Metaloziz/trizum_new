import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { BaseSelection, createEditor, Descendant, Transforms } from 'slate';
import { Editable, Slate, useSlate, withReact } from 'slate-react';

import { RichTextGallery } from './RichTextGallery';
import { MarkButton, BlockButton } from './RichTextComponents';
import { Elem, Leaf } from './RichTextElements';
import {
  CustomElement,
  CustomElementAlignment,
  CustomElementFormat,
  CustomText,
  CustomTextMark,
  BlockButtonProp,
  Hotkeys,
  KeysOfHotkeys,
  MarkButtonProp,
  RichTextEditorProps,
  RichEditorCallback,
} from './RichTextTypes';
import { toggleBlock, toggleMark, isMarkActive, isBlockActive } from './RichTextHelpers';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CollectionsIcon from '@mui/icons-material/Collections';
import ImageList from '@mui/material/ImageList';
import DoneIcon from '@mui/icons-material/Done';
import ImageListItem from '@mui/material/ImageListItem';
import { observer } from 'mobx-react-lite';
import slateStore from '../../app/stores/slateStore';
import _ from 'lodash';
import { galleryService } from '../../app/services/galleryService';
import imagesStore from '../../app/stores/imagesStore';

const HOTKEYS: Hotkeys = {
  b: 'bold',
  i: 'italic',
  u: 'underline',
  s: 'strike',
};

const RichTextEditor = observer((editorProps: RichTextEditorProps): JSX.Element => {
  const [selection, setSelection] = useState<any>([]);
  const { setContent, content } = slateStore;
  // console.log(_.cloneDeep(content))
  const [cont, setCont] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  useEffect(() => {
    setContent(cont);
  }, [cont]);
  const initialValue: Descendant[] = cont;
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props: any) => <Elem {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const insertImage = () => {
    // editor.insertBreak()
    editor.selection = selection;
    const textBlock: CustomText = { text: '' };
    const imageBlock: CustomElement = {
      type: 'picture',
      path: imagesStore.selectedImagePath,
      children: [textBlock],
    };
    editor.insertNode(imageBlock);
  };
  return (
    <Paper elevation={1}>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={value => {
          const isAstChange = editor.operations.some(op => 'set_selection' !== op.type);
          if (isAstChange) {
            setCont(value);
          }
          setSelection(editor.selection);
        }}
      >
        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <MarkButton mark="bold" />
          <MarkButton mark="italic" />
          <MarkButton mark="underline" />
          <MarkButton mark="strike" />

          <Divider flexItem />

          <BlockButton format="paragraph" />
          <BlockButton format="heading-two" />
          <BlockButton format="bulleted-list" />
          <BlockButton format="numbered-list" />
          <BlockButton format="block-quote" />

          <Divider flexItem />

          <BlockButton format="left" />
          <BlockButton format="center" />
          <BlockButton format="right" />
          <BlockButton format="justify" />

          <Divider flexItem />

          <RichTextGallery
            callback={() => {
              insertImage();
            }}
          />
        </Paper>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (event.ctrlKey && event.key === hotkey) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey as KeysOfHotkeys];
                toggleMark({ editor, mark });
              }
            }
          }}
        />
      </Slate>
    </Paper>
  );
});

export default RichTextEditor;
