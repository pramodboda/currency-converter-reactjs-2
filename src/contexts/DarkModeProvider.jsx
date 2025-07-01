import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import DarkModeContext from "./DarkModeContext.js";

import { lightGreen, yellow, deepPurple, grey } from "@mui/material/colors";

export default function DarkModeProvider({ children }) {
  const [mode, setMode] = React.useState("light");
  const darkMode = React.useMemo(
    () => ({
      toggleDarkMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        shape: {
          borderRadius: 0,
        },
        typography: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableRipple: false,
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                border: "none",
                borderRadius: "1.2rem",
              },
            },
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                padding: "1.2rem",
              },
            },
          },
        },
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                // primary: grey,
                primary: lightGreen,
                secondary: grey,
                divider: grey[300],
                background: {
                  default: grey[300],
                  paper: grey[50],
                },
                text: {
                  primary: grey[900],
                  secondary: grey[500],
                },
              }
            : {
                // palette values for dark mode
                // primary: grey,
                primary: lightGreen,
                secondary: grey,
                divider: grey[700],
                background: {
                  default: grey[900],
                  paper: "#333",
                },
                text: {
                  primary: "#fff",
                  secondary: grey[500],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <DarkModeContext.Provider value={darkMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}