import { Editor, Transforms, Element as SlateElement } from 'slate';

import {
  CustomEditor,
  CustomElement,
  CustomElementAlignment,
  CustomElementFormat,
  CustomTextMark,
} from './RichTextTypes';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blocktype: 'type' | 'align' = 'type',
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blocktype] === format,
    }),
  );
  return !!match;
};

type ToggleBLockProps = {
  editor: CustomEditor;
  format: CustomElementAlignment | CustomElementFormat;
};

export const toggleBlock = (props: ToggleBLockProps) => {
  const { editor, format } = props;
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: node =>
      !Editor.isEditor(node) &&
      SlateElement.isElement(node) &&
      LIST_TYPES.includes(node.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? 'justify' : (format as CustomElementAlignment),
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list_item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isMarkActive = (editor: CustomEditor, format: CustomTextMark) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

type ToggleMarkProps = { editor: CustomEditor; mark: CustomTextMark };

export const toggleMark = (props: ToggleMarkProps) => {
  const { editor, mark } = props;
  const isActive = isMarkActive(editor, mark);

  if (isActive) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
};
