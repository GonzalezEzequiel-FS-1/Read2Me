import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ActionIcon } from "@mantine/core";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeSwapper = () => {
  const { colorTheme, handleSetColorScheme } = useContext(ThemeContext);

  const whichTheme = () => {
    handleSetColorScheme();
    console.log(colorTheme)
  };

  return (
    <ActionIcon size="lg" variant="transparent" onClick={whichTheme}>
      {colorTheme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </ActionIcon>
  );
};

export default ThemeSwapper;
