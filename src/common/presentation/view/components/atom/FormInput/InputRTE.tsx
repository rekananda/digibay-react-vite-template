import { PropBaseT } from "@/common/presentation/view/types";
import { Box } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, Content, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactNode, useEffect } from 'react';
import { CustomInputWrapper } from './index.d';
import { FontSize } from './RTE/font-size';
import FontSizeControl from './RTE/FontSizeControl';

export type ExtensionRTE = 'Bold' | 'Italic' | 'Underline' | 'Color'
const extensionAvailablity = ['cycle','text-style', 'align', 'extra', 'hyperlink'] as const;

export type RTEExtensionT = typeof extensionAvailablity[number];

type PropsInputRTET = {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tooltip?: string;
  required?: boolean
  value?: Content;
  onChange?: (value?: string) => void;
  customData?: {
    fontSize?: string;
    className?: string;
  };
  placeholder?: string;
  extensions?: RTEExtensionT[]
} & PropBaseT

const InputRTE = (props: PropsInputRTET) => {
  
  const { tooltip, label, description, error, required, ...rteProps } = props;
  const { value = "", customData, placeholder, extensions=[], className, onChange } = rteProps
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color.configure({
        types: ['textStyle'],
      }),
      Placeholder.configure({ placeholder: placeholder || "" }),
      FontSize,
      Highlight,
      Link,
      SubScript,
      Superscript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Typography,
      Underline
    ],
    content: value,
    injectCSS: true,
    
  });
  const htmlData = editor?.getHTML();

  useEffect(() => {
    if (editor && editor.isFocused && value !== htmlData && onChange) {
      onChange(htmlData);
    }
  },[htmlData, onChange])

  return (
    <Box className={`flex flex-col ${className}`}>
      <CustomInputWrapper tooltip={tooltip} label={label} description={description} error={error} required={required}>
        <RichTextEditor editor={editor}>
          {editor && extensions.length===0 && (
            <BubbleMenu editor={editor}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Link />
              </RichTextEditor.ControlsGroup>
            </BubbleMenu>
          )}
          {extensions.length > 0 && <RichTextEditor.Toolbar>
            {extensions.indexOf("cycle") > -1 && <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>}
            {extensions.indexOf("text-style") > -1 && <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
            </RichTextEditor.ControlsGroup>}
            {extensions.indexOf("align") > -1 && <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignRight />
              <RichTextEditor.AlignJustify />
            </RichTextEditor.ControlsGroup>}
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>
            {extensions.indexOf("extra") > -1 && <RichTextEditor.ControlsGroup>
              <RichTextEditor.ColorPicker
                colors={[
                  '#25262b',
                  '#868e96',
                  '#fa5252',
                  '#e64980',
                  '#be4bdb',
                  '#7950f2',
                  '#4c6ef5',
                  '#228be6',
                  '#15aabf',
                  '#12b886',
                  '#40c057',
                  '#82c91e',
                  '#fab005',
                  '#fd7e14',
                ]}
              />
              <RichTextEditor.Highlight />
              <FontSizeControl value={editor?.getAttributes('textStyle').fontSize || customData?.fontSize}/>
            </RichTextEditor.ControlsGroup>}
            {extensions.indexOf("hyperlink") > -1 && <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>}
          </RichTextEditor.Toolbar>}

          <RichTextEditor.Content className={customData?.className||""}/>
        </RichTextEditor>
      </CustomInputWrapper>
    </Box>
  );
}

export default InputRTE;