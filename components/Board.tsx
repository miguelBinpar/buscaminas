import React from 'react';
import settings from '../settings';
import useWindowSize from '../hooks/useWindowSize';
import UICell from './Cell';
import { getAllCells } from '../model/board';

const { width, height } = settings;

const Board = (): JSX.Element => {
  const size = useWindowSize();
  const { width: windowWidth, height: windowHeight } = size;
  const side = Math.min(windowWidth - 40, windowHeight - 40);
  const style: React.CSSProperties = {
    position: 'absolute',
    left: (windowWidth - side) / 2,
    top: (windowHeight - side) / 2,
    width: side,
    height: side,
  };

  const getCells = (): JSX.Element[] => {
    return getAllCells().map((cell): JSX.Element => {
      const cellStyle: React.CSSProperties = {
        position: 'absolute',
        width: side / width,
        height: side / height,
        top: cell.y * (side / height),
        left: cell.x * (side / width),
      };
      return <UICell style={cellStyle} cell={cell} />;
    })
  };

  return <div className="container" style={style}>{getCells()}</div>;
};

export default Board;