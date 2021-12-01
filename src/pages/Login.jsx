import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../images/trybetrivia_logo.png';
import { fetchApi, fetchQuestions } from '../actions/index';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validadeButton = this.validadeButton.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  validadeButton() {
    const { name, email } = this.state;
    return !(name.length > 0 && email.length > 0);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async startGame() {
    const { fetchToken, history, questionsApi } = this.props;
    const { name, email } = this.state;

    await fetchToken();
    const { token } = this.props;

    await questionsApi(token);

    localStorage.setItem('token', token);
    localStorage.setItem(
      'state',
      JSON.stringify({ player: { name, email, score: 0, assertions: 0 } }),
    );

    history.push('/trivia');
  }

  render() {
    return (
      <div className="login-wrapper">
        <h1>Trybe Trivia</h1>
        {/* <img src={ logo } className="login-logo" alt="logo" /> */}
        <form className="login-form">
          <label htmlFor="name-input">
            Name
            <input
              type="text"
              name="name"
              id="name-input"
              data-testid="input-player-name"
              placeholder="Your name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input">
            Email
            <input
              type="email"
              name="email"
              id="email-input"
              data-testid="input-gravatar-email"
              placeholder="Your email address"
              onChange={ this.handleChange }
            />
          </label>
          <div className="login-btns">
            <button
              type="button"
              data-testid="btn-play"
              className="btn-play"
              disabled={ this.validadeButton() }
              onClick={ this.startGame }
            >
              Play
            </button>
            <Link to="/settings" className="btn-settings">
              <button type="button" data-testid="btn-settings">
                Settings
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchApi()),
  questionsApi: (token) => dispatch(fetchQuestions(token)),
});

Login.propTypes = {
  token: PropTypes.string,
  fetchToken: PropTypes.func,
  questionsApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
