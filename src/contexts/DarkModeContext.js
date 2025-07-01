import React from "react";

const DrakModeContext = React.createContext({
  mode: "light",
  toggleDarkMode: () => {},
});

export default DrakModeContext;