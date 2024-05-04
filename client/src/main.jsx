import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#191970",
    accent: "#FFD700",
    secondary: "#ffffff",
    accentVar: "#008080"
  },
  fonts: {
    heading: "Raleway, sans-serif",
    body: "Nunito, sans-serif"
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
)
