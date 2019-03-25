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
  UPDATE_ASSISTANT_FAILURE,
  REMOVE_ASSISTANT_REQUEST,
  REMOVE_ASSISTANT_SUCCESS,
  ADD_ASSISTANT_REQUEST,
  ADD_ASSISTANT_SUCCESS,
  ADD_ASSISTANT_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE
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

    case REMOVE_ASSISTANT_REQUEST:
      return { ...state, loading: action.loading }

    case REMOVE_ASSISTANT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: state.data.map(event => {
          if (event.id === action.data.event_id) {
            return {
              ...event,
              assistants: event.assistants.filter(assistant => assistant.id !== action.data.id)
            }
          }

          return event
        })
      }

    case ADD_ASSISTANT_REQUEST:
      return { ...state, loading: action.loading }

    case ADD_ASSISTANT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: state.data.map(event => {
          if (event.id === action.data.event_id) {
            return {
              ...event,
              assistants: [action.data, ...event.assistants]
            }
          }

          return event
        })
      }

    case ADD_ASSISTANT_FAILURE:
      return { ...state, loading: action.loading, error: action.error }

    case ADD_ITEM_REQUEST:
      return { ...state, loading: action.loading }

    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: state.data.map(event => {
          if (event.id === action.data.event_id) {
            return {
              ...event,
              menu: event.menu.map(category => {
                if (category.id === action.data.category_id) {
                  return {
                    ...category,
                    items: [action.data, ...category.items]
                  }
                }
                return category
              })
            }
          }

          return event
        })
      }

    case ADD_ITEM_FAILURE:
      return { ...state, loading: action.loading, error: action.error }

    case UPDATE_ITEM_REQUEST:
      return { ...state, loading: action.loading }

    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: state.data.map(event => {
          if (event.id === action.data.event_id) {
            return {
              ...event,
              menu: event.menu.map(category => {
                if (category.id === action.data.category_id) {
                  return {
                    ...category,
                    items: category.items.map(item => {
                      if (item.id === action.data.id) {
                        return {
                          ...item,
                          ...action.data
                        }
                      }
                      return item
                    })
                  }
                }
                return category
              })
            }
          }
          return event
        })
      }

    case UPDATE_ITEM_FAILURE:
      return { ...state, loading: action.loading, error: action.error }

    case REMOVE_ITEM_REQUEST:
      return { ...state, loading: action.loading }

    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: state.data.map(event => {
          if (event.id === action.data.eventId) {
            return {
              ...event,
              menu: event.menu.map(category => {
                if (category.id === action.data.categoryId) {
                  return {
                    ...category,
                    items: category.items.filter(item => item.id !== action.data.id)
                  }
                }
                return category
              })
            }
          }

          return event
        })
      }

    case UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: action.loading }

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: state.data.map(event => {
          if (event.id === action.data.eventId) {
            return {
              ...event,
              menu: event.menu.map(category => {
                if (category.id === action.data.id) {
                  return {
                    ...category,
                    name: action.data.name,
                    budget: action.data.budget
                  }
                }
                return category
              })
            }
          }
          return event
        })
      }

    default:
      return state
  }
}
