// Packages
import React from "react";
// UI Components
import { Container, VStack } from "@chakra-ui/react";
import Header from "./Header";
import AppTabs from "./AppTabs";

export const Layout = () => {
  return (
    <Container>
      <VStack>
        <Header />
        <AppTabs />
      </VStack>
    </Container>
  );
};
