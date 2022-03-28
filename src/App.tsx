// Packages
import React from "react";
import { Provider } from "react-redux";
import { Chart, registerables } from "chart.js";
// UI Components
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Layout } from "./components/Layout";
// State
import store from "./store";

// Global style customization for Chakra-ui
const theme = extendTheme({
  styles: {
    global: {
      body: { bg: "#F5F5F5" },
    },
  },
});

// Chart registrations
Chart.register(...registerables);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
