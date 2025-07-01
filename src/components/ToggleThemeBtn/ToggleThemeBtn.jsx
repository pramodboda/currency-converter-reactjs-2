import React from "react";

import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import DarkModeContext from "../../contexts/DarkModeContext";

export default function ToggleThemeBtn() {
  const theme = useTheme();
  const darkMode = React.useContext(DarkModeContext);
  return (
    <Button
      color="secondary"
      variant="text"
      onClick={darkMode.toggleDarkMode}
      endIcon={
        theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )
      }
    >
      {theme.palette.mode === "dark" ? "Light" : "Dark"} mode
    </Button>
  );
}