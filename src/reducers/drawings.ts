// Types
import { InitialStateType } from '../types/Types';

// Declare Type
const initialState: InitialStateType = {
  drawings: localStorage.getItem('drawings') ? JSON.parse(localStorage.drawings) : [],
  currentDrawing: localStorage.getItem('currentDrawing') ? JSON.parse(localStorage.currentDrawing) : null
};

// Reducer for state
export default function drawingsReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CURRENT_DRAWING':
      localStorage.setItem('currentDrawing', JSON.stringify(payload));
      return {
        ...state,
        currentDrawing: payload,
      };
    case 'SET_DRAWINGS':
      localStorage.setItem('drawings', JSON.stringify(payload));
      return {
        ...state,
        drawings: payload,
      };
    default:
      return state;
  }
}
