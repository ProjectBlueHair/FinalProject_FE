import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

import Router from "./Router";
import theme from "./styles/theme";
import { useEffect } from "react";
import { useStomp } from "./hook/useStomp";

const App = () => {
  // console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  // if (process.env.NODE_ENV === "production") {
  // console.log = function no_console() {};
  // console.warn = function no_console() {};
  // }

  // const { disconnect } = useStomp();

  // useEffect(() => {
  //   return () => {
  //     disconnect();
  //   };
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
