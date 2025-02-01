import { Box, Flex, Popover, PopoverDropdown, PopoverTarget, Select } from "@mantine/core";
import { RichTextEditorControl, RichTextEditorControlProps, useRichTextEditorContext } from "@mantine/tiptap";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useEffect } from "react";

type FontSizeControlProps = {
  value?: string;
} & RichTextEditorControlProps

const FontSizeControl = ({value = "16px", ...rest}: FontSizeControlProps) => {
  const { editor } = useRichTextEditorContext();

  useEffect(() => {
    editor && editor.commands.setFontSize(value)
  },[value, editor])
  return (
    <RichTextEditorControl
      aria-label="Font Size"
      title="Font Size"
      {...rest}
    >
      <Popover width={200} position="bottom" withArrow shadow="md">
        <PopoverTarget>
          <Flex align={"center"} mx={2}>
            <Box mr={4} className="text-xs">{value}</Box>
            <IconCaretDownFilled className="h-3 w-3"/>
          </Flex>
        </PopoverTarget>
        <PopoverDropdown>
          <Select
            // withCheckIcon={false}
            dropdownOpened
            value={value}
            data={Array(116).fill(0).map((_, index) => `${index+12}px`)}
            onChange={(val) => editor?.commands.setFontSize(val||"16px")}
            searchable
          />
        </PopoverDropdown>
      </Popover>
    </RichTextEditorControl>
  );
}

export default FontSizeControl;