import React from 'react';
import PropTypes from 'prop-types';
import { IoStopwatchSharp } from 'react-icons/io5';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../styles/Timer.css';

class Timer extends React.Component {
  render() {
    const { timer, answerTime, buttonStyle } = this.props;
    return (
      <div className="timer-container">
        <IoStopwatchSharp />
        <span>{buttonStyle ? answerTime : timer}</span>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number,
  answerTime: PropTypes.number,
}.isRequired;

export default Timer;
