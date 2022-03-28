export type InitialStateType = {
  drawings: any,
  currentDrawing: any
}

export type DrawingPointType = Array<number>
export type DrawingDataType = Array<DrawingPointType>;
export type DrawingListType = Array<DrawingDataType>;

export type DimensionsType = {
  width: number,
  height: number
}

export type StageType = {
  scale: number,
  x: number,
  y: number,
}