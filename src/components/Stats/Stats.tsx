import React from "react";
import { useSelector } from "react-redux";
// UI Components
import {
  HStack,
  Text,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
// Types and Utils
import { RootState, DrawingListType, DrawingDataType } from "../../types";
import { randomColorGenerator } from "../../utils/heplers";


// Generates Chart Data by using drawings state
const generateChartData = (data: DrawingListType) => {
  const drawingData: any = {};
  data
    .map((drawing: DrawingDataType) => String(drawing.length))
    .forEach((x: string) => {
      drawingData[x] = (drawingData[x] || 0) + 1;
    });

  return {
    labels: Object.keys(drawingData).map((label) => `Corner count: ${label}`),
    datasets: [
      {
        label: "Number of drawings",
        data: Object.values(drawingData),
        backgroundColor: Object.values(drawingData).map(() => randomColorGenerator()),
        borderWidth: 1,
      },
    ],
  };
}; 

export const Stats = () => {
  // External Hooks
  const drawings = useSelector((state: RootState) => state.drawings.drawings);

  const data = generateChartData(drawings);
  return (
    <HStack justifyContent='center'>
      {drawings && drawings.length > 0 ?
        <Bar data={data} /> :
        <Text>No any data yet!</Text>  
      }
    </HStack>
  );
}
