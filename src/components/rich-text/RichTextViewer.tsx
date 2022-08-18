import React, { useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Elem, Leaf } from './RichTextElements';

type RichTextViewerPropsT = { content: any };

const RichTextViewer = (viewerProps: RichTextViewerPropsT) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props: any) => <Elem {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  return (
    <Slate editor={editor} value={viewerProps.content as Descendant[]}>
      <Editable readOnly renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
};

export default RichTextViewer;
