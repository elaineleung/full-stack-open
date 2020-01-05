/* eslint-disable default-case */
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const increaseGood = state.good + 1
      const newGood = {...state, good: increaseGood}
      state = newGood
      return state
    case 'OK':
      const increaseOK = state.ok + 1
      const newOK = {...state, ok: increaseOK}
      state = newOK
      return state
    case 'BAD':
      const increaseBad = state.bad + 1
      const newBad = {...state, bad: increaseBad}
      state = newBad
      return state
    case 'ZERO':
      const zero = {good: 0, ok: 0, bad: 0}
      state = zero
      return state
    default:
      return state
  }
}

export default counterReducer