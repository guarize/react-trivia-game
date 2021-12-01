import {
  TOKEN,
  SAVE_QUESTIONS,
} from '../actions/index';

const INITIAL_STATE = {
  token: '',
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
  default:
    return state;
  }
};

export default reducer;
