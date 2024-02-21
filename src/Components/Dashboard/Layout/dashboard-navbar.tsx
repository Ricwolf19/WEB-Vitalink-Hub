import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  // Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  // Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  // setOpenConfigurator,
  setOpenSidenav,
} from "../../../Context/MaterialController";
import React from "react";
import { useAuth } from "../../../Context/authContext";
import { AlignJustifyIcon, BellDotIcon, LogOutIcon } from "lucide-react";

// profile menu component
const profileMenuItems = [
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          placeholder=""
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            placeholder=""
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList placeholder="" className="p-1">
        <Link to={"/dashboard/settings"}>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              placeholder=""
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                placeholder=""
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
        </Link>
      </MenuList>
    </Menu>
    </div>
  );
}

export function DashboardNavbar() {
  const { logOut } = useAuth()
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const handleLogout = async () => { //Se crea una funcion asyncrona para poder deslogearse
    try {
        await logOut()
    } catch (error) {
        console.log(error)
    }
}

  return (
    <Navbar
      placeholder=""
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            placeholder=""
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              placeholder=""
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
            {/* <Typography variant="h6" placeholder="" color="blue-gray">
              {page}
            </Typography> */}
          </Breadcrumbs>
        </div>
        <div className="flex items-center">
          {/* <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" crossOrigin="" />
            
          </div> */}
          <IconButton
            placeholder=""
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <AlignJustifyIcon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          
            <Button
              placeholder=""
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5 text-blue-gray-500" />
              Sign Out
            </Button>
            <IconButton
              placeholder=""
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton placeholder="" variant="text" color="blue-gray">
                <BellDotIcon className="h-5 w-5 text-blue-gray-500 mr-2" />
              </IconButton>
            </MenuHandler>
            <MenuList placeholder="" className="w-max border-0">
              <MenuItem placeholder="" className="flex items-center gap-3">
                <Avatar
                  placeholder=""
                  src=""
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem placeholder="" className="flex items-center gap-4">
                <Avatar
                  placeholder=""
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem placeholder="" className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <IconButton
          placeholder=""
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}
          <ProfileMenu />
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/Components/Dashboard/Layout/dashboard-navbar.tsx";

export default DashboardNavbar;

