// Packages
import React from "react";
// UI Components
import {
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

const Header = () => {
  return (
    <Stack spacing={2} textAlign="center" mt="4rem">
      <Heading as="h1" size="xl" isTruncated>
        Polygon Drawing App
      </Heading>
      <Text color="gray.700" fontSize="1.5rem">
        Draw and save shapes
      </Text>
    </Stack>
  );
};

export default Header;
