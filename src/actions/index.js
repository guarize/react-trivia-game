const URL_TRIVIA_TOKEN = 'https://opentdb.com/api_token.php?command=request';
export const TOKEN = 'TOKEN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const PLAYER_INFO = 'PLAYER_INFO';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_RANKING = 'SAVE_RANKING';
export const SAVE_PICTURE = 'SAVE_PICTURE';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';

const saveToken = (token) => ({
  type: TOKEN,
  token,
});

export const fetchApi = () => (dispatch) =>
  fetch(URL_TRIVIA_TOKEN).then((response) =>
    response.json().then(({ token }) => dispatch(saveToken(token))),
  );

const saveQuestions = (questions) => ({ type: SAVE_QUESTIONS, questions });

export const saveGameSetting = (url, questionsLength) => ({
  type: SAVE_SETTINGS,
  url,
  questionsLength,
});

export const fetchQuestions = (token, url) => (dispatch) =>
  fetch(`${url}${token}`).then((response) =>
    response.json().then((json) => dispatch(saveQuestions(json))),
  );

export const saveScore = (score) => ({ type: SAVE_SCORE, score });
