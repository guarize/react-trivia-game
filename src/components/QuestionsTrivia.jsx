import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AnswersButton from './AnswersButton';

class QuestionsTrivia extends Component {
  render() {
    const {
      questionsShuffled,
      counter,
      buttonStyle,
      handleAnswersButton,
      handleClassName,
      buttonsDisabled,
    } = this.props;
    return (
      <div className="questions-trivia animeTop">
        {questionsShuffled.length > 0 && (
          <div className="question-container">
            <div className="trivia-question">
              <p data-testid="question-category" className="question-category">
                {questionsShuffled[counter].category}
              </p>
              <div className="question animeUp">
                <p
                  data-testid="question-text" dangerouslySetInnerHTML={ { __html: questionsShuffled[counter].question } }
                />
              </div>
            </div>
            <div className="answers-container">
              {questionsShuffled[counter].shuffleAnswers.map(
                (answer, index) => {
                  const correctAnswer = questionsShuffled[counter].correct_answer;
                  return (
                    <AnswersButton
                      key={ answer }
                      answer={ answer }
                      correctAnswer={ correctAnswer }
                      buttonsDisabled={ buttonsDisabled }
                      buttonStyle={ buttonStyle }
                      index={ index }
                      handleAnswersButton={ handleAnswersButton }
                      handleClassName={ handleClassName }
                      difficulty={ questionsShuffled[counter].difficulty }
                    />
                  );
                },
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

QuestionsTrivia.propTypes = {
  buttonStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  counter: PropTypes.number.isRequired,
  buttonsDisabled: PropTypes.bool.isRequired,
  handleAnswersButton: PropTypes.func.isRequired,
  handleClassName: PropTypes.func.isRequired,
  questionsShuffled: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionsTrivia;
