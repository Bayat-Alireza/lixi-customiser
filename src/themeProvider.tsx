import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { getThemeByName } from "./themes/getThem";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);
// export const ThemeContext = React.createContext((themeName: string): void => { });

const ThemeProvider: React.FC = (props) => {
  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState("lightTheme");
  // const [theme, setTheme] = useState(getThemeByName("darkTheme"))

  // Retrieve the theme object by theme name
  const theme = getThemeByName(themeName);

  return (
    <ThemeContext.Provider value={_setThemeName}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
