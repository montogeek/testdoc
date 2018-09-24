import { DateTime } from "luxon"
import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  UPDATE_ASSISTANT_REQUEST,
  UPDATE_ASSISTANT_SUCCESS,
  UPDATE_ASSISTANT_FAILURE
} from "../constants"

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
      return {
        ...state,
        loading: action.loading,
        data: action.data.map(event => ({
          ...event,
          date: DateTime.fromSQL(event.date, { zone: "utc" }).toLocal()
        }))
      }

    case GET_EVENTS_FAILURE:
      return { ...state, loading: action.loading, error: action.error }

    case CREATE_EVENT_REQUEST:
      return { ...state, loading: action.loading }

    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: [...state.data, action.data]
      }

    case CREATE_EVENT_FAILURE:
      return { ...state, loading: action.loading, error: action.error }

    case UPDATE_EVENT_REQUEST:
      return { ...state, loading: action.loading }

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: state.data.map(event => {
          if (event.id === action.data.id) {
            return {
              ...event,
              ...action.data
            }
          }
          return event
        })
      }

    case UPDATE_EVENT_FAILURE:
      return { ...state, loading: action.loading, error: action.error }

    case UPDATE_ASSISTANT_REQUEST:
      return { ...state, loading: action.loading }

    case UPDATE_ASSISTANT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: state.data.map(event => {
          if (event.id === action.data.event_id) {
            return {
              ...event,
              assistants: event.assistants.map(assistant => {
                if (assistant.id === action.data.id) {
                  return {
                    ...assistant,
                    ...action.data
                  }
                }
                return assistant
              })
            }
          }
          return event
        })
      }

    case UPDATE_ASSISTANT_FAILURE:
      return { ...state, loading: action.loading, error: action.error }

    default:
      return state
  }
}
