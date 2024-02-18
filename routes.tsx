import React from 'react'; 

import {
  LucideHome,
  UserRound,
  Table2Icon,
  BellDot,
} from "lucide-react"

import { Home, Profile, Tables, Notifications } from "./src/Pages/Dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: React.createElement(LucideHome, icon), // Render the icon using React.createElement
        name: "dashboard",
        path: "/home",
        element: React.createElement(Home), // Render the element using React.createElement
      },
      {
        icon: React.createElement(UserRound, icon),
        name: "profile",
        path: "/profile",
        element: React.createElement(Profile),
      },
      {
        icon: React.createElement(Table2Icon, icon),
        name: "tables",
        path: "/tables",
        element: React.createElement(Tables), 
      },
      {
        icon: React.createElement(BellDot, icon), 
        name: "notifications",
        path: "/notifications",
        element: React.createElement(Notifications),
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


