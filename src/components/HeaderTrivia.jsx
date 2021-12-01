import React from 'react';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';

class HeaderTrivia extends React.Component {
  render() {
    const {
      player: { name, email, score },
    } = JSON.parse(localStorage.getItem('state'));

    return (
      <header className="trivia-header">
        <p data-testid="header-score">{`Score: ${score}`}</p>
        <div className="header-profile">
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt={ name }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
        </div>
      </header>
    );
  }
}

export default HeaderTrivia;
