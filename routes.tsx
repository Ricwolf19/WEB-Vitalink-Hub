import {
    LucideHome,
    UserRound,
    Table2Icon,
    BellDot,
} from "lucide-react"

  import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
  
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routes = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <LucideHome {...icon} />,
          name: "dashboard",
          path: "/home",
          element: <Home />,
        },
        {
          icon: <UserRound {...icon} />,
          name: "profile",
          path: "/profile",
          element: <Profile />,
        },
        {
          icon: <Table2Icon {...icon} />,
          name: "tables",
          path: "/tables",
          element: <Tables />,
        },
        {
          icon: <BellDot {...icon} />,
          name: "notifications",
          path: "/notifications",
          element: <Notifications />,
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
  