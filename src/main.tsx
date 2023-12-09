import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import BackgroundWrapper from "./utils/BackgroundWrapper.tsx";
import ToggleTheme from "./utils/ToggleTheme.tsx";

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
