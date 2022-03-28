// Converts 2D canvas shape array to 1D array
export const flattenedPoints = (drawing: any, isFinished: boolean = true, curMousePos: any = []) => {
  // [ [a, b], [c, d], ... ] to [ a, b, c, d, ...]
  return drawing
    .concat(isFinished ? [] : curMousePos)
    .reduce((a: any, b: any) => a.concat(b), []);
}

// Random Color Generator for chart bar
export const randomColorGenerator = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Drawing JSON file validation
export const validateDrawingData = (data: any) => {
  if (Array.isArray(data)) {
    for (const outer of data) {
      if (Array.isArray(outer)) {
        for (const inner of outer) {
          if (typeof inner === 'number') {
            return true;
          }
          return false;
        }
      }
      return false;
    }
  }
  return false;
}