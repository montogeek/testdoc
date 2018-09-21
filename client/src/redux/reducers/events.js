import { GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE } from "../constants"

const initialState = {
  data: [],
  loading: false,
  error: null
}

export default function events(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return { ...state, loading: action.loading }

    case GET_EVENTS_SUCCESS:
      return { ...state, loading: action.loading, data: action.data }

    case GET_EVENTS_FAILURE:
      return { ...state, loading: action.loading, error: action.error }

    default:
      return state
  }
}
