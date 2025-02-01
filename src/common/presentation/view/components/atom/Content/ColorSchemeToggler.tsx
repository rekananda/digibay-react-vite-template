import useLocalstorage from "@Hooks/useLocalstorage";
import Icon from "@Atom/Icon";
import {
  ActionIcon,
  ActionIconProps,
  useMantineColorScheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useEffect } from "react";

const colorSchemes = ["light", "dark"] as const;
export type ColorSchemeT = (typeof colorSchemes)[number];

const ColorSchemeToggler = (props: ActionIconProps) => {
  const { setColorScheme } = useMantineColorScheme();
  const [colorScheme] = useLocalstorage<ColorSchemeT>(
    "mantine-color-scheme-value",
    "light",
  );
  const [value, toggle] = useToggle(colorSchemes);

  useEffect(() => {
    toggle(colorScheme);
  }, []);

  useEffect(() => {
    setColorScheme(value);
  }, [value]);

  return (
    <ActionIcon variant="subtle" size={28} {...props} onClick={() => toggle()}>
      <Icon name={value === "dark" ? "IconSun" : "IconMoon"} size={20} />
    </ActionIcon>
  );
};

export default ColorSchemeToggler;
