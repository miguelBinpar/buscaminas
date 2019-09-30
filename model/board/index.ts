/* eslint-disable no-param-reassign */
import settings from '../../settings';
import { Cell, Board, OnStateChange } from '../types';

const { width, height, mines } = settings;

const defaultState = {
  open: false,
  minesAround: 0,
  isMine: false,
  hasFlag: false,
};

const allCells = new Array<Cell>();

const getInitialBoard = (): Board => {
  const board = new Array<Cell[]>();
  for (let y = 0; y < height; y += 1) {
    const row = new Array<Cell>();
    for (let x = 0; x < width; x += 1) {
      const cell: Cell = {
        x,
        y,
        state: {...defaultState},
        stateHandlers: new Array<OnStateChange>(),
      };
      row.push(cell);
      allCells.push(cell);
    }
    board.push(row);
  }
  return board;
};

const currentBoard = getInitialBoard();

export const getAllCells = (): Cell[] => allCells;

export const getBoard = (): Board => currentBoard;

const getNextCells = (cell: Cell): Cell[] => {
  const res = [];
  for (let y = Math.max(0, cell.y - 1); y < Math.min(cell.y + 2, height); y += 1) {
    for (let x = Math.max(0, cell.x - 1); x < Math.min(cell.x + 2, width); x += 1) {
      res.push(currentBoard[x][y]);
    }
  }
  return res;
};

const clearBoard = (): void => {
  allCells.forEach((cell) => {
    cell.state = {...defaultState};
  })
};

const addMines = (): void => {
  const cellsWithMine = allCells
    .sort((): number => Math.random() - 0.5)
    .slice(0, mines);

  cellsWithMine.forEach((cell): void => {
    cell.state.isMine = true;
    getNextCells(cell).forEach((adjacent) => {
      adjacent.state.minesAround += 1;
    });
  })
};

export const changeCellState = (cell, newState): void => {
  const state = {
    ...cell.state,
    ...newState,
  };
  cell.stateHandlers.forEach((handler) => {
    handler(state);
  })
  // TODO: update adjacents
};

const resetBoard = (): void => {
  clearBoard();
  addMines();
};

resetBoard();
