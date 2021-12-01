import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-wrapper">
        <h1 data-testid="ranking-title">Leaderboard</h1>
        <div className="ranking-container">
          {ranking
            .sort((a, b) => b.score - a.score)
            .map(({ name, score, picture }, index) => (
              <div
                key={ index }
                className="ranking-player"
                style={ {
                  backgroundColor:
                    index % 2 === 0
                      ? 'rgba(39,45,47, 0.7)'
                      : 'rgba(5,56,44, 0.7)',
                } }
              >
                <img src={ picture } alt="avatar" />
                <p className="player-name" data-testid={ `player-name-${index}` }>
                  {name}
                </p>
                <p data-testid={ `player-score-${index}` }>{score}</p>
              </div>
            ))}
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Play Again
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
