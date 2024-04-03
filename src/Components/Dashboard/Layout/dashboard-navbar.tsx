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
import { Button as ButtonX } from "@nextui-org/react";

import {
  useMaterialTailwindController,
  // setOpenConfigurator,
  setOpenSidenav,
} from "../../../Context/MaterialController";
import React from "react";
import { useAccountData, useAuth } from "../../../Context/authContext";
import { AlignJustifyIcon, ChevronDown, CircleUserIcon, LogOutIcon } from "lucide-react";
import { SwitchI18n } from "../../../i18n/SwitchI18n";
import { useTranslation } from "react-i18next";

function ProfileMenu() {
  const { accountData } = useAccountData()

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [t] = useTranslation("global");

  // profile menu component
  const profileMenuItems = [
    {
      label: t("d-navbar.settings"),
      icon: CircleUserIcon,
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            placeholder=""
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 py-0.5 pr-3 pl-2 lg:ml-auto"
          >
            <div className="pr-1 text-blue-800">
              {accountData.userName}
            </div>
            <Avatar
              placeholder=""
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-blue-900 p-0.5"
              src={accountData.profilePhoto}
            />

            <ChevronDown
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
            <Typography variant="h6" placeholder="" color="blue-gray">
              {page}
            </Typography>
          </Breadcrumbs>
        </div>

        <div className="flex items-center">
          <IconButton
            placeholder=""
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <AlignJustifyIcon strokeWidth={3} className="h-6 w-6 text-blue-900" />
          </IconButton>

          <ProfileMenu />
          <SwitchI18n />
          <ButtonX
            className="hidden items-center gap-1 px-4 xl:flex normal-case text-red-600 bg-white"
            onClick={handleLogout}
          >
            <LogOutIcon className="h-5 w-5 text-red-600" />
          </ButtonX>

          <IconButton
            placeholder=""
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={handleLogout}
          >
            <LogOutIcon className="h-5 w-5 text-red-600" />
          </IconButton>

        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/Components/Dashboard/Layout/dashboard-navbar.tsx";

export default DashboardNavbar;

