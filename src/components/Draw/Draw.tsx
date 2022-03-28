// Packages
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
// UI Components
import {
  Box,
  HStack,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Save, Trash2 } from "react-feather";
import DeleteModal from './DeleteModal';
import GuidePopover from './GuidePopover';
import { Stage, Layer, Line, Rect } from "react-konva";
import Upload from 'rc-upload';
// Types and Utils
import { RootState, DrawingDataType, DrawingPointType, DimensionsType, StageType } from "../../types";
import { flattenedPoints, validateDrawingData } from "../../utils/heplers";

interface DrawProps {
  dimensions: DimensionsType
}

export const Draw: React.FC<DrawProps> = ({ dimensions }) => {
  // External Hooks
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentDrawing = useSelector((state: RootState) => state.drawings.currentDrawing);
  const drawings = useSelector((state: RootState) => state.drawings.drawings);

  // Internal Hooks
  const [points, setPoints] = useState<DrawingDataType>(currentDrawing || []);
  const [curMousePos, setCurMousePos] = useState<Array<number>>([0, 0]);
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [stage, setStage] = useState<StageType>({
    scale: 1,
    x: 0,
    y: 0,
  });

  // Registers keydown event for undo functionality
  useEffect(() => {
    window.addEventListener("keydown", handleClickCtrlZ);
    return () => {
      window.removeEventListener("keydown", handleClickCtrlZ);
    };
  }, [points]);

  // CTRL/CMD + Z for undo functionality
  const handleClickCtrlZ = (e: any) => {
    const evtobj = window.event ? window.event : e;
    if (
      (evtobj.keyCode === 90 && evtobj.ctrlKey) ||
      (evtobj.keyCode === 90 && evtobj.metaKey)
    ) {
      if (points.length > 1) {
        const newPoints = points.slice(0);
        newPoints.pop();
        setPoints(newPoints);
      }
    }
  };

  // 
  const getMousePos = (stage: any) => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y];
  };

  // Mouse click on the canvas
  const handleClick = (event: any) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    if (isFinished) return;
    // When finishing the drawing
    if (isMouseOverStartPoint && points.length >= 3) {
      setIsFinished(true);
      dispatch({ type: "SET_CURRENT_DRAWING", payload: null });
    } else {
      setPoints([...points, mousePos]);
      setTimeout(() => {
        dispatch({ type: "SET_CURRENT_DRAWING", payload: [...points, mousePos] });
      }, 0)
    }
  };

  // Mouse move on the canvas
  const handleMouseMove = (event: any) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);
    setCurMousePos(mousePos);
  };

  // Mouse over on the canvas area while drawing
  const handleMouseOverStartPoint = (event: any) => {
    if (isFinished || points.length < 3) return;
    event.target.scale({ x: 2, y: 2 });
    setIsMouseOverStartPoint(true);
  };

  // Mouse out from the canvas area while drawing
  const handleMouseOutStartPoint = (event: any) => {
    event.target.scale({ x: 1, y: 1 });
    setIsMouseOverStartPoint(false);
  };

  // Dragging polygon points
  const handleDragMovePoint = (event: any) => {
    const index = event.target.index - 1;
    const pos = [event.target.attrs.x, event.target.attrs.y];
    setPoints([...points.slice(0, index), pos, ...points.slice(index + 1)]);
  };

  // Zoom in/out
  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
    });
  };

  // Delete drawing
  const handleDeleteDrawing = () => {
    setPoints([]);
    setCurMousePos([0, 0]);
    onClose();
    setIsFinished(false);
  }

  // Save drawing
  const handleSaveDrawing = () => {
    // Set State
    const newDrawings = [...drawings, points];
    dispatch({ type: "SET_DRAWINGS", payload: newDrawings });

    setPoints([]);
    setIsFinished(false);

    // Notification
    toast({
      title: "Drawing saved!",
      description: "You can see your drawings on 'My drawings' tab.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  // Upload JSON file
  const handleImportJSON = (file: File) => {
    // Reading JSON file
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");

    fileReader.onload = (e: any) => {
      const importedDrawingData = JSON.parse(e.target.result);
      // Check uploaded file
      const isValidData = validateDrawingData(importedDrawingData);
      if (isValidData) {
        setIsFinished(true);
        return setPoints(importedDrawingData);
      };
      return toast({
        title: "Upload issue!",
        description: "Please upload valid JSON file!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    };
  }

  return (
    <Box w="100%">
      <Stage
        width={dimensions.width || 500}
        height={dimensions.height || 500}
        onMouseDown={handleClick}
        onMouseMove={handleMouseMove}
        style={{ background: "white" }}
        onWheel={handleWheel}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
      >
        <Layer>
          <Line
            points={flattenedPoints(points, isFinished, curMousePos)}
            stroke="teal"
            strokeWidth={3}
            closed={isFinished}
          />
          {points.map((point: DrawingPointType, index: number) => {
            const width = 3;
            const x = point[0] - width / 2;
            const y = point[1] - width / 2;
            const startPointAttr =
              index === 0
                ? {
                    hitStrokeWidth: 12,
                    onMouseOver: handleMouseOverStartPoint,
                    onMouseOut: handleMouseOutStartPoint,
                  }
                : null;
            return (
              <Rect
                key={index}
                x={x}
                y={y}
                width={width}
                height={width}
                fill="black"
                stroke="black"
                strokeWidth={6}
                onDragMove={handleDragMovePoint}
                draggable
                {...startPointAttr}
              />
            );
          })}
        </Layer>
      </Stage>

      {/* Footer */}
      <HStack mt={4} justifyContent="space-between">
        {/* Guide popover */}
        <HStack>
          <GuidePopover />
          <Upload
            accept='.json'
            action= '/upload.do'
            onStart={handleImportJSON}
          >
            <Button colorScheme='teal'>Upload</Button>
          </Upload>
        </HStack>
        <HStack>
          {isFinished && (
            <Button
              onClick={handleSaveDrawing}
              colorScheme="teal"
              size="md"
              leftIcon={<Save />}
            >
              Save
            </Button>
          )}
          {points.length > 0 && (
            <Button
              onClick={onOpen}
              colorScheme="red"
              size="md"
              leftIcon={<Trash2 />}
            >
              Clear Drawing
            </Button>
          )}
        </HStack>
      </HStack>

      {/* Delete Modal */}
      <DeleteModal
        onClose={onClose}
        isOpen={isOpen}
        handleDeleteDrawing={handleDeleteDrawing}
      />
    </Box>
  );
}
