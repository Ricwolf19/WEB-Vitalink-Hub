import {
  LayoutPanelLeftIcon,
  UsersIcon,
  CalendarHeartIcon,
  KanbanSquareIcon,
  Cog,
} from 'lucide-react'

import { Home, Personal, Calendar, Kanban, Settings } from "./src/Pages/Modules";

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
        name: "Calendar",
        path: "/calendar",
        element: <Calendar />,
      },
      {
        icon: <KanbanSquareIcon {...icon} />,
        name: "Kanban board",
        path: "/kanban",
        element: <Kanban />,
      },
      {
        icon: <Cog {...icon} />,
        name: "Settings",
        path: "/settings",
        element: <Settings />,
      },
      // {
      //   icon: <Cog {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      // {
      //   icon: <Cog {...icon} />,
      //   name: "Profile - test",
      //   path: "/profile",
      //   element: <Profile />,
      // },
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
