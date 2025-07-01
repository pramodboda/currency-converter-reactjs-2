import React from "react";

import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import ColorModeContext from "../../contexts/ColorModeContext";

export default function ToggleThemeBtn() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Button
      color="secondary"
      variant="text"
      onClick={colorMode.toggleColorMode}
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