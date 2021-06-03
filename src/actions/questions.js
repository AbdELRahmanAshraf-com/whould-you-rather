import { hideLoading, showLoading } from "react-redux-loading"
import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA"
export const RECIEVE_QUESTIONS = "RECIEVE_QUESTIONS"
export const ADD_QUESTION = "ADD_QUESTION"
export const ANSWER_QUESTION = "ANSWER_QUESTION"

export function receiveQuestions(questions) {
  return {
    type: RECIEVE_QUESTIONS,
    questions,
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, authedUser) {
  return dispatch => {
    dispatch(showLoading())
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function answerQuestion(answer, qid, authedUser) {
  return {
    type: ANSWER_QUESTION,
    qid,
    answer,
    authedUser,
  }
}

export function handleAnswerQuestion(answer, qid, authedUser) {
  return dispatch => {
    dispatch(showLoading())
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(dispatch(answerQuestion(answer, qid, authedUser)))
      .then(() => dispatch(hideLoading()))
  }
}
