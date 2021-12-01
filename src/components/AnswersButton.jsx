import PropTypes from 'prop-types';
import React from 'react';

class AnswersButton extends React.Component {
  render() {
    const {
      answer,
      correctAnswer,
      buttonsDisabled,
      buttonStyle,
      index,
      handleAnswersButton,
      handleClassName,
      difficulty,
    } = this.props;
    return (
      <button
        key={ answer }
        type="button"
        data-testid={
          answer === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
        }
        disabled={ buttonsDisabled }
        className={ buttonStyle && handleClassName(answer, correctAnswer) }
        dangerouslySetInnerHTML={ { __html: answer } }
        onClick={ () => handleAnswersButton(difficulty, (answer === correctAnswer)) }
      />
    );
  }
}

AnswersButton.propTypes = {
  answer: PropTypes.string.isRequired,
  buttonStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  buttonsDisabled: PropTypes.bool.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  handleAnswersButton: PropTypes.func.isRequired,
  handleClassName: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default AnswersButton;
