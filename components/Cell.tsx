/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Cell, CellState } from '../model/types';
import { changeCellState } from '../model/board';
import useCellState from '../hooks/useCellState';

interface CellProps {
  style: React.CSSProperties;
  cell: Cell;
}

const getClassNames = ({ open, isMine, minesAround, hasFlag }: CellState): string[] => {
  const classes = ['box'];
  if (open) {
    if (isMine) {
      classes.push('mine');
    } else if (minesAround) {
      classes.push('number');
    } else {
      classes.push('active');
    }
  } else if (hasFlag) {
    classes.push('.flag');
  }
  return classes;
}

const UICell = ({ style, cell }: CellProps): JSX.Element => {
  const state = useCellState(cell);
  const onClick = (): void => {
    console.log('onClick!', cell);
    changeCellState(cell, { open: true });
  };

  return (
    <div
      className={getClassNames(state).join(' ')}
      style={style}
      onClick={onClick}
      
    >
      {`${cell.state.minesAround}`}
    </div>
  );
};

export default UICell;
