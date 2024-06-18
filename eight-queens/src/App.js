import React, { useState, useEffect } from 'react';
import Chessboard from './Chessboard';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch('/filtered.json')
      .then(response => response.json())
      .then(data => setJsonData(data))
      .catch(error => console.error('Error fetching JSON data:', error));
  }, []);

  const handleSearch = () => {
    const chessNotation = /^[a-h][1-8]$/;
    if (!chessNotation.test(input.toLowerCase())) {
      alert("Please enter a valid chess coordinate (e.g., 'a1', 'h8').");
      return;
    }

    const y = input.charCodeAt(0) - 97; // 'a' is 97 in ASCII
    const x = 8 - parseInt(input[1]);

    for (const array of jsonData) {
      if (array.some(([coordX, coordY]) => coordX === x && coordY === y)) {
        setCoordinates(array);
        return;
      }
    }
    setCoordinates([]); // No match found
  };

  return (
    <div className="app">
      <h1>Задача о 8 ферзях</h1>
      <h2>Плютто А. П. | Жданов О. В.</h2>
      <p>Расставить на стандартной 64-клеточной шахматной доске 8 ферзей так, чтобы ни один из них не находился под боем другого.</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Координата первого ферзя"
        className="input"
      />
      <button onClick={handleSearch} className="button">Найти решение</button>
      <br/>
      <Chessboard coordinates={coordinates} setInput={setInput} />
    </div>
  );
};

export default App;

