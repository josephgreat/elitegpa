import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';
const styles = {
  global: props => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#141276')(props),
    },
  }),
};

const components = {
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: props => ({
      dialog: {
        bg: mode('white', '#141214')(props),
      },
    }),
  },
};
const theme = extendTheme({
  colors: {
    primary: "#191970",
    accent: "#FFD700",
    secondary: "#ffffff",
    accentVar: "#008080",
  },
  fonts: {
    heading: "Raleway, sans-serif",
    body: "Nunito, sans-serif",
  },
  config: {
    initialColorMode: "system",
    useSystemColorMode: false,
  },components, styles
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>
);
