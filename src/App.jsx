
import GlobalStyle from './GlobalStyle';

import Router from './Router';

const App = ()=>{

  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }
  
  return (
    <>
    <GlobalStyle/>
    <Router/>
    </>
  );
}

export default App;
