import ky from "ky"

const actions = store => ({
  login: async (state, email, password) => {
    const res = await ky.post(`http://localhost/login`, { json: { email, password }, credentials: "include" }).json()

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
          Authorization: "Bearer " + state.auth.access_token
        }
      })
      .json()

    return {
      user
    }
  },

  logout: async state => {
    const res = await ky
      .post("http://localhost/api/logout", {
        headers: {
          Authorization: "Bearer " + state.auth.access_token
        }
      })
      .json()

    localStorage.removeItem("access_token")
    localStorage.removeItem("expires_in")
    localStorage.removeItem("authenticated")

    return {
      auth: {
        authenticated: false,
        access_token: "",
        expires_in: ""
      },
      user: {}
    }
  }
})

export default actions
