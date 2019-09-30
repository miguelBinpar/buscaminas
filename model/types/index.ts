export interface CellState {
  open: boolean;
  isMine: boolean;
  minesAround: number;
  hasFlag: boolean;
}

export type OnStateChange = (newState: CellState) => void;

export interface Cell {
  x: number;
  y: number;
  state: CellState;
  stateHandlers: OnStateChange[];
}

export type Board = Cell[][];
