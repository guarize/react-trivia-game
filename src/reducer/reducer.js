import {
  TOKEN,
  SAVE_QUESTIONS,
  SAVE_SETTINGS,
} from '../actions/index';

const INITIAL_STATE = {
  token: '',
  api_url: 'https://opentdb.com/api.php?amount=5&token=',
  questions_length: '4',
  questions: [],
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions.results,
    };
  case SAVE_SETTINGS:
    return {
      ...state,
      api_url: action.url,
      questions_length: action.questionsLength - 1,
    };
  default:
    return state;
  }
};

export default reducer;
