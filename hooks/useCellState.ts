import { useState } from 'react';
import { Cell, CellState } from '../model/types';

const useCellState = (cell: Cell): CellState => {
  const [state, updateState] = useState<CellState>(cell.state);
  cell.stateHandlers.push(updateState);
  return state;
};

export default useCellState;
