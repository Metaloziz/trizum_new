import { makeAutoObservable } from 'mobx';
import { Descendant } from 'slate';

class SlateStore {
  content: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setContent = (value: Descendant[]) => {
    this.content = value;
  };
}
export default new SlateStore();
