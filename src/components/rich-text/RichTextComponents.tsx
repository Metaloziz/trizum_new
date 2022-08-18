import React, { ReactNode, Ref, PropsWithChildren, FC } from 'react';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import SegmentIcon from '@mui/icons-material/Segment';
import TitleIcon from '@mui/icons-material/Title';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ReactDOM from 'react-dom';
import { Editor } from 'slate';

import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './RichTextHelpers';
import {
  CustomTextMark,
  CustomElementFormat,
  CustomEditor,
  CustomElementAlignment,
  MarkButtonProp,
  BlockButtonProp,
  IconProp,
} from './RichTextTypes';
import { useSlate } from 'slate-react';
import imagesStore from '../../app/stores/imagesStore';

export const GetIcon: FC<IconProp> = props => {
  switch (props.data) {
    case 'bold':
      return <FormatBoldIcon />;
    case 'italic':
      return <FormatItalicIcon />;
    case 'underline':
      return <FormatUnderlinedIcon />;
    case 'strike':
      return <FormatStrikethroughIcon />;
    case 'paragraph':
      return <SegmentIcon />;
    case 'heading-two':
      return <TitleIcon />;
    case 'bulleted-list':
      return <FormatListBulletedIcon />;
    case 'numbered-list':
      return <FormatListNumberedIcon />;
    case 'block-quote':
      return <FormatQuoteIcon />;
    case 'left':
      return <FormatAlignLeftIcon />;
    case 'center':
      return <FormatAlignCenterIcon />;
    case 'right':
      return <FormatAlignRightIcon />;
    case 'justify':
    default:
      return <FormatAlignJustifyIcon />;
  }
};

export const MarkButton: FC<MarkButtonProp> = props => {
  const { mark } = props;
  const editor = useSlate();
  return (
    <ToggleButton
      selected={isMarkActive(editor, mark)}
      value={mark}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark({ editor, mark });
      }}
    >
      <GetIcon data={mark} />
    </ToggleButton>
  );
};

export const BlockButton: FC<BlockButtonProp> = props => {
  const { format } = props;
  const editor = useSlate();
  const blocktype: 'type' | 'align' = ['left', 'center', 'right', 'justify'].includes(format)
    ? 'align'
    : 'type';
  const { selectedImagePath } = imagesStore;
  return (
    <ToggleButton
      selected={isBlockActive(editor, format, blocktype)}
      value={format}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock({ editor, format });
      }}
    >
      <GetIcon data={format} />
    </ToggleButton>
  );
};
