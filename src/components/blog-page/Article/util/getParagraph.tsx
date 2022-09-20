export type Paragraph = {
  type: 'paragraph';
  children: [
    {
      text: 'A line of text in a paragraph.';
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strike?: boolean;
    },
  ];
};

export const getParagraphs = (content: Paragraph[] | any) =>
  content
    .filter((el: { type: string }) => el.type === 'paragraph')
    // @ts-ignore
    .map(el => <div key={Math.random()}>{el.children[0].text}</div>);
