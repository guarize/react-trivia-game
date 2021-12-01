import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { GiQueenCrown } from 'react-icons/gi';
import md5 from 'crypto-js/md5';
import HeaderTrivia from '../components/HeaderTrivia';
import '../styles/Feedback.css';

class Feedback extends React.Component {
  componentDidMount() {
    const {
      player: { score, email, name },
    } = JSON.parse(localStorage.getItem('state'));

    const localRanking = JSON.parse(localStorage.getItem('ranking'));

    localStorage.setItem(
      'ranking',
      JSON.stringify([
        ...localRanking,
        {
          name,
          score,
          picture: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
        },
      ]),
    );
  }

  render() {
    const MIN_QUESTIONS = 3;
    const {
      player: { score, assertions },
    } = JSON.parse(localStorage.getItem('state'));
    return (
      <div className="feedback-wrapper">
        <HeaderTrivia score={ score } />
        <div className="feedback-container">
          <div>
            {assertions > 0 ? (
              <p>
                You got
                { ' ' }
                <span data-testid="feedback-total-question">{assertions}</span>
                { ' ' }
                questions right!
              </p>
            ) : (
              <p>
                <span data-testid="feedback-total-question">{assertions}</span>
                !
                { ' ' }
                You got them all wrong!
              </p>
            )}
          </div>
          {assertions >= MIN_QUESTIONS ? (
            <h3 data-testid="feedback-text">Good Job!</h3>
          ) : (
            <h3 data-testid="feedback-text">You could do better...</h3>
          )}
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Play Again
            </button>
          </Link>
          <Link to="ranking">
            <button type="button" className="ranking-button" data-testid="btn-ranking">
              Leaderboard
              <GiQueenCrown className="ranking-icon" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
