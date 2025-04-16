"use client";

import { store } from "@/store";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS>{children}</ChakraProvider>
    </Provider>
  );
}
