import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import ToggleTheme from "./components/ToggleTheme.tsx";
import BackgroundWrapper from "./components/BackgroundWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BackgroundWrapper>
        <ToggleTheme />
        <App />
      </BackgroundWrapper>
    </ChakraProvider>
  </React.StrictMode>
);
