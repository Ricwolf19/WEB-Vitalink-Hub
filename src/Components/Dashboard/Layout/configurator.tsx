import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "../../../Context/MaterialController";


export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;


  const sidenavColors: any = { //Learn how to type this data here????
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" placeholder="" color="blue-gray">
            Dashboard Configurator
          </Typography>
          <Typography placeholder="" className="font-normal text-blue-gray-600">
            See our dashboard options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          placeholder=""
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-12">
          <Typography variant="h6" placeholder="" color="blue-gray">
            Sidenav Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" placeholder="" color="blue-gray">
            Sidenav Types
          </Typography>
          <Typography variant="small" placeholder="" color="gray">
            Choose between 3 different sidenav types.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
            placeholder=""
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "dark")}
            >
              Dark
            </Button>
            <Button
            placeholder=""
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "transparent")}
            >
              Transparent
            </Button>
            <Button
            placeholder=""
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "white")}
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" placeholder="" color="blue-gray">
              Navbar Fixed
            </Typography>
            <Switch
              crossOrigin=""
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
          <hr />
          {/* <div className="my-8 flex flex-col gap-4">
            <a
              href=""
              target="_black"
            >
              <Button variant="gradient" placeholder="" fullWidth>
                Free Download
              </Button>
            </a>
            <a
              href=""
              target="_black"
            >
              <Button variant="outlined" placeholder="" color="blue-gray" fullWidth>
                View Documentation
              </Button>
            </a>
            <a
              href=""
              target="_black"
            >
              <Button variant="outlined" placeholder="" color="blue-gray" fullWidth>
                Material Tailwind PRO
              </Button>
            </a>
          </div> */}
          {/* <a
            className="mx-auto flex items-center justify-center gap-2"
            href="https://github.com/creativetimofficial/material-tailwind-dashboard-react"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a> */}
        </div>
        {/* <div className="text-center">
          <Typography variant="h6" placeholder="" color="blue-gray">
            Thank you for sharing 
          </Typography>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              variant="gradient"
              placeholder=""
              className="flex items-center gap-2"
            >
              <i className="fa-brands fa-twitter text-white" />
              Tweet
            </Button>
            <Button
            placeholder=""
              variant="gradient"
              className="flex items-center gap-2"
            >
              <i className="fa-brands fa-facebook text-white" />
              Share
            </Button>
          </div>
        </div> */}
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/Components/Dashboard/Layout/configurator.tsx";

export default Configurator;
