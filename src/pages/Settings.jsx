import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveGameSetting } from '../actions';
import '../styles/Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberQuestions: '5',
      questionType: '',
    };

    this.onSettingsChange = this.onSettingsChange.bind(this);
    this.onSaveSettings = this.onSaveSettings.bind(this);
  }

  onSettingsChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  onSaveSettings() {
    const { saveSetting, history } = this.props;
    const { numberQuestions, questionType } = this.state;

    if (numberQuestions === '5' && !questionType) {
      saveSetting(
        'https://opentdb.com/api.php?amount=5&token=',
        numberQuestions,
      );
    } else if (questionType) {
      saveSetting(
        `https://opentdb.com/api.php?amount=${numberQuestions}&type=${questionType}&token=`,
        numberQuestions,
      );
    } else if (!questionType && numberQuestions !== '5') {
      saveSetting(
        `https://opentdb.com/api.php?amount=${numberQuestions}&token=`,
        numberQuestions,
      );
    }

    history.push('/');
  }

  render() {
    const { numberQuestions } = this.state;
    return (
      <div className="settings-wrapper">
        <h1 data-testid="settings-title">Settings:</h1>
        <div className="settings-container">
          <label htmlFor="question-number">
            Number of Questions:
            <input
              type="number"
              name="numberQuestions"
              value={numberQuestions}
              onChange={this.onSettingsChange}
            />
          </label>
          <label htmlFor="question-type">
            Question Type:
            <select
              id="question-type"
              name="questionType"
              onChange={this.onSettingsChange}
            >
              <option value="">All types</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>

          <button
            type="button"
            className="settings-save"
            onClick={this.onSaveSettings}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  saveSetting: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveSetting: (url, questionsLength) =>
    dispatch(saveGameSetting(url, questionsLength)),
});

export default connect(null, mapDispatchToProps)(Settings);
