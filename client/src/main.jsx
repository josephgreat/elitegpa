import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration.js'; // Import service worker registration

const styles = {
  global: props => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', '#121212')(props),
    },
  }),
};

const components = {
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: props => ({
      dialog: {
        bg: mode('gray.50', '#121212')(props),
      },
    }),
  },
};
const theme = extendTheme({
  colors: {
    primary: "#191970",
    accent: "#FFD700",
    secondary: "#ffffff",
    secondaryAlt: "#121212",
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>
);

// serviceWorkerRegistration.register(); // Register the service worker