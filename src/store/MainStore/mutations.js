export function login(state, sessionId){
  state.sessionId = sessionId
}

export function mutateVote(state){
  state.isVoted = true
}

export function clearState(state){
  state.isVoted = false
  state.sessionId = null
}
