import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
//import { XMarkIcon } from "@heroicons/react/24/outline";
import { X } from 'lucide-react'
import {
  // Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "../../../Context/MaterialController";


interface Page {
  icon?: any;
  name: string;
  path: string;
  color?: any; // Making color optional
}

interface Layout {
  layout: string
  title?: string;
  pages: Page[];
}

interface SidenavProps {
  routes: Layout[];
}

export function Sidenav({ routes }: SidenavProps) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes: any = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };


  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-200`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 text-center">
          <div className="flex justify-center items-center h-full">
            <img src="https://i.ibb.co/zHDB2x1/logo-rbg.png" alt="VitaLink" className="max-w-[40%] max-h-[40%]" />
          </div>
          <Typography
            placeholder=""
            variant="h4"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="text-blue-900 pt-5"
          >
            VitaLink
          </Typography>
          <br />
        </Link>
        <IconButton
          placeholder=""
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <X strokeWidth={1.5} className="h-5 w-5 text-blue-900" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  placeholder=""
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      placeholder=""
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        placeholder=""
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/logo-rbg.png",
  brandName: "VitaLink",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/Components/Dashboard/Layout/sidenav.tsx";

export default Sidenav;
