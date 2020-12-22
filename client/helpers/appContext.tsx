import React from "react";
import {ThemeProvider, DarkMode, theme as defaultTheme} from "@chakra-ui/core";
import Dialog from "../components/Dialog";
import getColorScheme from "./generateColorScheme";
import {SingletonHooksContainer} from "react-singleton-hook";

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: getColorScheme(defaultTheme.colors.blue[500], 10), //defaultTheme.colors.blue,
    secondary: defaultTheme.colors.gray,
    info: defaultTheme.colors.teal,
    alert: defaultTheme.colors.purple,
    warning: defaultTheme.colors.orange,
    danger: defaultTheme.colors.red,
    success: defaultTheme.colors.green,
    // muted: getColorScheme("#888"),
  },
};

const AppContext: React.FC = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <SingletonHooksContainer />
      <DarkMode>
        <Dialog>{children}</Dialog>
      </DarkMode>
    </ThemeProvider>
  );
};

export default AppContext;
