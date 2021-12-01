import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import HeaderTrivia from '../components/HeaderTrivia';
import QuestionsTrivia from '../components/QuestionsTrivia';
import Timer from '../components/Timer';
import { fetchQuestions } from '../actions/index';
import '../styles/Trivia.css';

// let timer;

class HomeTrivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      buttonStyle: '',
      timerValue: 30,
      answerTime: 0,
      buttonsDisabled: false,
      score: 0,
    };

    this.handleAnswersButton = this.handleAnswersButton.bind(this);
    this.addCounter = this.addCounter.bind(this);
    this.timerCountdown = this.timerCountdown.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  componentDidMount() {
    const { token, questionsApi } = this.props;
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }

    questionsApi(token);

    this.timerCountdown();
  }

  getScore() {
    const {
      player: { score: localScore },
    } = JSON.parse(localStorage.getItem('state'));
    this.setState({ score: localScore });
  }

  handleAnswersButton(difficulty, isCorrect) {
    const { timerValue } = this.state;
    const { player } = JSON.parse(localStorage.getItem('state'));

    this.setState({
      buttonStyle: true,
      answerTime: timerValue,
    });

    if (isCorrect) {
      const BASE_SCORE = 10;
      const difficultyScore = { hard: 3, medium: 2, easy: 1 };
      const calculateScore = BASE_SCORE + timerValue * difficultyScore[difficulty];

      const localState = localStorage.getItem('state');
      const {
        player: { score: localScore, assertions: localAssertions = 0 },
      } = JSON.parse(localState);

      localStorage.setItem(
        'state',
        JSON.stringify({
          player: {
            ...player,
            score: localScore + calculateScore,
            assertions: localAssertions + 1,
          },
        }),
      );

      this.getScore();
    }
  }

  handleClassName(answer, correctAnswer) {
    if (answer === correctAnswer) return 'green-border';

    return 'red-border';
  }

  addCounter() {
    const { history } = this.props;
    const { counter } = this.state;

    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      buttonStyle: '',
      timerValue: 30,
    }));
    this.timerCountdown();
    const LENGTH_QUESTIONS = 4;
    if (counter === LENGTH_QUESTIONS) history.push('/feedback');
  }

  timerCountdown() {
    const { answerTime } = this.state;
    const TIMER_INTERVAL = 1000;
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        timerValue:
          prevState.timerValue > 0
            ? prevState.timerValue - 1
            : prevState.timerValue,
        buttonsDisabled: prevState.timerValue <= 1 && answerTime === 0,
      }));
    }, TIMER_INTERVAL);
  }

  render() {
    const { questionsShuffled } = this.props;
    const {
      counter,
      buttonStyle,
      timerValue,
      answerTime,
      buttonsDisabled,
      score,
    } = this.state;
    const QUESTIONS_LENGTH = 4;
    return (
      <div className="trivia-wrapper">
        <HeaderTrivia score={ score } />
        <div className="trivia-container">
          <h1>
            {counter === QUESTIONS_LENGTH
              ? 'Final Question'
              : `Question ${counter + 1}`}
          </h1>
          <Timer
            timer={ timerValue }
            answerTime={ answerTime }
            buttonStyle={ buttonStyle }
          />
          <QuestionsTrivia
            questionsShuffled={ questionsShuffled }
            counter={ counter }
            buttonStyle={ buttonStyle }
            buttonsDisabled={ buttonsDisabled }
            handleAnswersButton={ this.handleAnswersButton }
            handleClassName={ this.handleClassName }
          />
          {buttonStyle && (
            <button
              type="button"
              data-testid="btn-next"
              className="btn-next"
              onClick={ this.addCounter }
            >
              Próxima
            </button>
          )}
        </div>
      </div>
    );
  }
}

// Reference to array shuffle method https://flaviocopes.com/how-to-shuffle-array-javascript/
const mapStateToProps = (state) => ({
  questionsShuffled: state.reducer.questions.map((question) => {
    const POINT_FIVE = 0.5;
    return {
      shuffleAnswers: [
        question.correct_answer,
        ...question.incorrect_answers,
      ].sort(() => Math.random() - POINT_FIVE),
      ...question,
    };
  }),
  player: state.reducer.player,
  token: state.reducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  questionsApi: (token) => dispatch(fetchQuestions(token)),
});

HomeTrivia.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  questionsApi: PropTypes.func.isRequired,
  questionsShuffled: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTrivia);
