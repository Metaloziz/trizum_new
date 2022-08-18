import {BaseEditor, Descendant} from 'slate'
import {ReactEditor} from 'slate-react'

export type CustomEditor = BaseEditor & ReactEditor

export type CustomElementFormat = 'block-quote' | 'bulleted-list' | 'heading-one' | 'heading-two' | 'list-item' | 'numbered-list' | 'paragraph' | 'picture'
export type CustomElementAlignment = "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"
export type CustomElement = {
    type: string,
    align? : "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start" | undefined
    children: CustomText[],
    path?: string
}

export type CustomTextMark = 'bold' | 'italic' | 'underline' | 'strike'
export type CustomText = {text: string, bold?: true, italic?: true, underline?: true, strike?: true}

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor
        Element: CustomElement
        Text: CustomText
    }
}

export type BlockButtonProp = {format: CustomElementFormat | CustomElementAlignment}
export type Hotkeys = {b:CustomTextMark,i:CustomTextMark,u:CustomTextMark,s:CustomTextMark}
export type KeysOfHotkeys = keyof Hotkeys
export type MarkButtonProp = {mark:CustomTextMark}
export type RichEditorCallback = (...args: any[]) => void
export type RichTextEditorProps = {initialValue?: Descendant[] | null, callback?: RichEditorCallback}
export type IconProp = { data: CustomElementAlignment | CustomElementFormat | CustomTextMark }
export type RichGalleryProps = {callback: (...args: any[]) => void}