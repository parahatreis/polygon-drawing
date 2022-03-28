import React from 'react'
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { Info } from "react-feather";

const GuidePopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" colorScheme="teal" leftIcon={<Info />}>
          Usage
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Usage</PopoverHeader>
        <PopoverBody>
          <OrderedList>
            <ListItem>
              Draw by clicking on the white area (canvas area)
            </ListItem>
            <ListItem>Scroll to zoom in/out</ListItem>
            <ListItem>Save your drawing by clicking the 'Save' button</ListItem>
            <ListItem>
              Clear your drawing by clicking the 'Clear Drawing' button
            </ListItem>
          </OrderedList>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default GuidePopover;
