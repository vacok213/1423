"use client";

import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { LuMoon, LuSun } from "react-icons/lu";

import { Switch } from "@heroui/react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const handleChange = (selected: boolean) => {
    selected ? setTheme("light") : setTheme("dark");
  };

  return (
    <Switch
      startContent={<LuMoon />}
      endContent={<LuSun />}
      isSelected={theme === "light" || isSSR}
      onValueChange={handleChange}
    />
  );
}
