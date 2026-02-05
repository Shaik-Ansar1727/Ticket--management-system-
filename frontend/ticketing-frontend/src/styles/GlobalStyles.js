import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


  body {
    margin: 0;
    font-family: "Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgb(13, 12, 34);
    background-color: #f5f5f7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    font-family: inherit;
    color: inherit;
    text-decoration: none;
  }
`;
