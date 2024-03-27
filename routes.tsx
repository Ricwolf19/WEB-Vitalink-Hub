import {
  LayoutPanelLeftIcon,
  UsersIcon,
  CalendarHeartIcon,
  KanbanSquareIcon,
  Cog,
  Files,
} from 'lucide-react'

import { Home, Personal, Calendars, Kanban, Notifications, Settings, Documents } from "./src/Pages/Modules";
import { GrDocumentStore } from 'react-icons/gr';

const icon = {
  className: "text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <LayoutPanelLeftIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Personal",
        path: "/personal",
        element: <Personal />,
      },
      {
        icon: <CalendarHeartIcon {...icon} />,
        name: "Calendars",
        path: "/calendars",
        element: <Calendars />,
      },
      {
        icon: <KanbanSquareIcon {...icon} />,
        name: "Kanban board",
        path: "/kanban",
        element: <Kanban />,
      },
      {
        icon: <Files {...icon} />,
        name: "Documents Storage",
        path: "/documents",
        element: <Documents/>,
      },
      {
        icon: <Cog {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <Cog {...icon} />,
        name: "Settings",
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
