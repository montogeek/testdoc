import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import PrivateRoute from "./helpers/router"

import EventCreate from "./views/eventcreate"
import EventUpdate from "./views/eventupdate"
import Dashboard from "./pages/Dashboard"
import Assistants from "./components/assistants"
import AssistantCreate from "./components/assistants/create"
import Menu from "./views/menu"
import MenuItemCreate from "./components/menu/create";
import Layout from "./components/layout"
import Home from "./pages/Home"

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/dashboard",
    exact: true,
    component: PrivateRoute(Dashboard)
  },
  {
    path: "/event/create",
    exact: true,
    component: PrivateRoute(EventCreate)
  },
  {
    path: "/event/update/:id",
    exact: true,
    component: PrivateRoute(EventUpdate)
  },
  {
    path: "/event/:id/assistants",
    exact: true,
    component: PrivateRoute(Assistants)
  },
  {
    path: "/event/:id/assistants/create",
    exact: true,
    component: PrivateRoute(AssistantCreate)
  },
  {
    path: "/event/:id/menu",
    exact: true,
    component: PrivateRoute(Menu)
  },
  {
    path: "/event/:id/menu/create",
    exact: true,
    component: PrivateRoute(MenuItemCreate)
  },
  {
    path: "/event/:id/layout",
    exact: true,
    component: PrivateRoute(Layout)
  },
  {
    path: "*",
    component: () => "404"
  }
]

export default routes
