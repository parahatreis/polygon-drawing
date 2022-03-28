// Packages
import React from "react";
// UI Components
import { Stage, Layer, Line, Rect } from "react-konva";
// Types and Utils
import { DrawingDataType, DrawingPointType } from "../../types";
import { flattenedPoints } from "../../utils/heplers";

interface DrawingItemProps {
  drawing: DrawingDataType
}

const DrawingItem: React.FC<DrawingItemProps> = ({ drawing }) => {  
  return (
    <Stage
      width={350}
      height={300}
      style={{ background: "white" }}
      scaleX={0.5}
      scaleY={0.5}
    >
      <Layer>
        <Line
          points={flattenedPoints(drawing)}
          stroke="teal"
          strokeWidth={3}
          closed={true}
        />
        {drawing.map((point: DrawingPointType, index: number) => {
          const width = 3;
          const x = point[0] - width / 2;
          const y = point[1] - width / 2;
          const startPointAttr = index === 0 ? { hitStrokeWidth: 12 } : null;
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
              draggable
              {...startPointAttr}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default DrawingItem;
