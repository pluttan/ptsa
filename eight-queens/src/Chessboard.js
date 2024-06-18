import React, { useState } from 'react';
import './Chessboard.css';

const Chessboard = ({ coordinates, setInput }) => {
  const [highlightedCells, setHighlightedCells] = useState([]);

  const board = Array(8).fill(null).map(() => Array(8).fill(null));

  const highlightQueenMoves = (x, y) => {
    const moves = [];

    // Horizontal and vertical moves
    for (let i = 0; i < 8; i++) {
      if (i !== x) moves.push([i, y]); // Vertical
      if (i !== y) moves.push([x, i]); // Horizontal
    }

    // Diagonal moves
    for (let i = 1; i < 8; i++) {
      if (x + i < 8 && y + i < 8) moves.push([x + i, y + i]);
      if (x - i >= 0 && y - i >= 0) moves.push([x - i, y - i]);
      if (x + i < 8 && y - i >= 0) moves.push([x + i, y - i]);
      if (x - i >= 0 && y + i < 8) moves.push([x - i, y + i]);
    }

    setHighlightedCells(moves);
  };

  coordinates.forEach(([x, y]) => {
    board[x][y] = '♛';
  });

  const handleClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] === '♛') {
      highlightQueenMoves(rowIndex, colIndex);
    } else {
      setHighlightedCells([])
      const coordinate = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
      setInput(coordinate);
    }
  };

  const renderCell = (cell, rowIndex, colIndex) => (
    <div
      key={`${rowIndex}-${colIndex}`}
      className={`cell ${highlightedCells.some(([x, y]) => x === rowIndex && y === colIndex) ? 'highlight' : ''}`}
      onClick={() => handleClick(rowIndex, colIndex)}
    >
      {highlightedCells.some(([x, y]) => x === rowIndex && y === colIndex) ? '✗' : cell}
    </div>
  );

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} className="row">
      {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
    </div>
  );

  return (
    <div className="chessboard-container">
      <div className="labels-top">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="label-top">{String.fromCharCode(97 + i)}</div>
        ))}
      </div>
      <div className="chessboard">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            <div className="label-side">{8 - rowIndex}</div>
            {renderRow(row, rowIndex)}
          </div>
        ))}
      </div>
      <button onClick={() => setHighlightedCells([])} className="button">Очистить...</button>
    </div>
  );
};

export default Chessboard;

