import ky from "ky"

const actions = store => ({
  login: async (state, email, password) => {
    const res = await ky
      .post(`http://localhost/login`, { json: { email, password }})
      .json()

    localStorage.setItem("access_token", res.access_token)
    localStorage.setItem("expires_in", Date.now() + res.expires_in * 1000)
    localStorage.setItem("authenticated", true)

    return {
      auth: {
        authenticated: true,
        ...res
      }
    }
  },

  getEvents: async state => {
    const events = await ky
      .post("http://localhost/api/events", {
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
      .get("http://localhost/api/user", {
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
