import React, { useState, useEffect } from "react";
import "./App.css";

const emojis = [
  { id: 1, symbol: "😀" },
  { id: 2, symbol: "😂" },
  { id: 3, symbol: "😍" },
  { id: 4, symbol: "🤔" },
  { id: 5, symbol: "😭" },
];

const App = () => {
  const [votes, setVotes] = useState(
    JSON.parse(localStorage.getItem("votes")) ||
      emojis.map((emoji) => ({ ...emoji, count: 0 }))
  );
  const [winner, setWinner] = useState(null);
  const [noWinner, setNoWinner] = useState(false);

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (id) => {
    const updated = votes.map((emoji) =>
      emoji.id === id ? { ...emoji, count: emoji.count + 1 } : emoji
    );
    setVotes(updated);
  };

  const handleShowResults = () => {
    const maxi = Math.max(...votes.map((emoji) => emoji.count));
    if (maxi === 0) {
      setNoWinner(true);
      setWinner(null);
    } else {
      const winner = votes.find((emoji) => emoji.count === maxi);
      setWinner(winner);
      setNoWinner(false);
    }
  };

  const handleClearResults = () => {
    const reset = emojis.map((emoji) => ({ ...emoji, count: 0 }));
    setVotes(reset);
    setWinner(null);
    setNoWinner(false);
  };

  return (
    <div className="App">
      <h1 className="textw">Голосування за EMOJIS</h1>
      <div className="emoji-list">
        {votes.map((emoji) => (
          <div key={emoji.id} className="emoji-item">
            <span
              className="emoji-iten"
              role="img"
              aria-label="emoji"
              onClick={() => handleVote(emoji.id)}
              style={{ cursor: "pointer", fontSize: "2rem", margin: "10px" }}
            >
              {emoji.symbol}
            </span>
            <span className="zero">{emoji.count}</span>
          </div>
        ))}
      </div>
      <div className="block-btn">
        <button className="buttonone" onClick={handleShowResults}>
          Show Results
        </button>
        <button className="buttontho" onClick={handleClearResults}>
          Очистити результати
        </button>
      </div>
      {noWinner && (
        <div className="results">
          <h2>Немає переможця, голосів немає.</h2>
        </div>
      )}
      {winner && !noWinner && (
        <div className="results">
          <h2>
            Переможець: {winner.symbol} з {winner.count} голосами
          </h2>
        </div>
      )}
    </div>
  );
};

export default App;
