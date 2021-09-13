import { RECIEVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from "../actions/questions"

export default (state = [], action) => {
  switch (action.type) {
    case RECIEVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }

    case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser]),
          },
        },
      }

    default:
      return state
  }
}
