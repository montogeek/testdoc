import PrivateRoute from "./helpers/router"
import EventCreate from "./views/eventcreate"
import EventUpdate from "./views/eventupdate"
import Dashboard from "./pages/Dashboard"
import Assistants from "./components/assistants"
import Home from "./pages/Home"

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/dashboard",
    component: PrivateRoute(Dashboard)
  },
  {
    path: "/event/create",
    component: PrivateRoute(EventCreate)
  },
  {
    path: "/event/update/:id",
    component: PrivateRoute(EventUpdate)
  },
  {
    path: "/event/:id/assistants",
    component: PrivateRoute(Assistants)
  },
  {
    path: "*",
    component: () => "404"
  }
]

export default routes
