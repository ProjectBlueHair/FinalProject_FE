import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

import Router from "./Router";
import theme from "./styles/theme";

const App = () => {
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
