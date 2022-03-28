// Packages
import React from "react";
import { useSelector } from "react-redux";
// UI Components
import { Text, VStack } from "@chakra-ui/react";
import DrawingItem from "./DrawingItem";
// Types and Utils
import { RootState } from "../../types/RootState";

export const DrawingList = () => {
  const drawings = useSelector((state: RootState) => state.drawings.drawings);

  return (
    <VStack spacing={4}>
      {drawings && drawings.length > 0 ? (
        drawings.map((drawing: any, index: number) => (
          <DrawingItem key={index} drawing={drawing} />
        ))
      ) : (
        <Text>No any drawings</Text>
      )}
    </VStack>
  );
};
