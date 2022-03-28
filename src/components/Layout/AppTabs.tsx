// Packages
import React, { useLayoutEffect, useRef, useState } from "react";
// UI Components
import {
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Box,
} from "@chakra-ui/react";
import { Draw } from "../Draw";
import { DrawingList } from "../Drawings";
import { Stats } from "../Stats";
// Types and Utils
import { DimensionsType } from "../../types";

const AppTabs = () => {
  const divRef = useRef<number | any>(null);
  const [dimensions, setDimensions] = useState<DimensionsType>({ width: 0, height: 0 });

  // Gets element width and height to update canvas area
  const getDimensions = () => ({
    width: divRef.current.offsetWidth,
    height: divRef.current.offsetHeight,
  });

  // Resigters resize event for resposive ui
  useLayoutEffect(() => {
    const handleResize = () => setDimensions(getDimensions());
    if (divRef.current) setDimensions(getDimensions());

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [divRef]);

  return (
    <Box w="100%">
      <Tabs variant="soft-rounded" mt={3} colorScheme="green">
        <TabList w="100%" display="flex" justifyContent="center">
          <Tab>Draw</Tab>
          <Tab>My Drawings</Tab>
          <Tab>Statistics</Tab>
        </TabList>
        <TabPanels>
          {/* Draw */}
          <TabPanel ref={divRef} width="100%" height="500px" py="2rem" px={0}>
            <Draw dimensions={dimensions} />
          </TabPanel>

          {/* My Drawings */}
          <TabPanel py="2rem" px={0}>
            <DrawingList />
          </TabPanel>

          {/* Statistics */}
          <TabPanel py="2rem" px={0}>
            <Stats />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AppTabs;
