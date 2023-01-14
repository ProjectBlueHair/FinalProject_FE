import { createGlobalStyle } from "styled-components";
export const supportDeviceSize = 768;
export const supportDeviceSize_ = 1100;
export const iconSize = "4rem";
export const vectorSize = "1rem";

const GlobalStyle = createGlobalStyle`


  :root{
   
    --ec-main-color:#FF4D00;
    --ec-primary-text: #2F1B1A;
    --ec-secondary-text:#8E8E8E;

    --ec-primary-background : #FFFFFF;
    --ec-secondary-background : #8E8E8E;

    --ec-secondary-filter : invert(62%) sepia(7%) saturate(28%) hue-rotate(315deg) brightness(91%) contrast(79%);

    --color-yellow: #F8D706;
    --color-gray: #B2B2B2;
    --color-primary: #0095F6;
    --color-primary-invalid:#B2DDFF;
    --color-light-gray:#7F7F7F;
    --color-black:#2F1B1A;
    --color-white:#FFFFFF;
    --color-red:#F04438;
    --color-subtle-gray:#CCCCCC;

    --ec-gap1 : 0.5rem;
    --ec-gap2 : 1rem;
 }

  html {
    font-size: 62.5%; // 1rem = 10px 로 변경 한 것
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    text-decoration: none;
    outline : none;
  }

  body {

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: 1.4rem;
    color: var(--ec-primary-text);
    background-color: var(--ec-primary-background);
    width: 100vw;
    height: 100vh;
    font-weight: 500;
    h1{
      font-size: 2.2rem;
    }
    h2{
      font-size: 1.6rem;
    }
    h3 { 
      font-size:1.4rem;
    }
    .primary-text { 
      color :var(--ec-primary-text);
    }
    .secondary-text { 
      color :var(--ec-secondary-text);
    }
  }
  
  
`;

export default GlobalStyle;
