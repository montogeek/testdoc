import ky from "ky"

const actions = store => ({
  login: async (state, email, password) => {
    const res = await ky.post(`/login`, { json: { email, password } }).json()

    return {
      auth: {
        authenticated: true,
        ...res
      }
    }
  },

  getEvents: async state => {
    const events = await ky
      .post("/api/events", {
        headers: {
          Authorization: "Bearer " + state.auth.access_token
        }
      })
      .json()

    return {
      data: {
        events
      }
    }
  },

  getUser: async state => {
    const user = await ky
      .get("/api/user", {
        headers: {
          Authorization: "Bearer " + +state.auth.access_token
        }
      })
      .json()

    return {
      user
    }
  }
})

export default actions
