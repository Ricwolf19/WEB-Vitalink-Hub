import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { SwitchI18n } from "../../i18n/SwitchI18n";

import { Logo } from "./Icons";
import { Link as ScrollLink } from "react-scroll"; //Se puede adaptar nombre a lo que se agarre de el paquete
import { Login } from "../SignIn/Login";
import { SignUp } from "../SignIn/SignUp";
import { useTranslation } from "react-i18next";

export function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [t] = useTranslation("global");

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <ScrollLink to="Objective" spy offset={-80} duration={500} className="text-red-600">
            {t('s-navbar.item1')}
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="Services" spy offset={-80} duration={500} className="text-red-600">
            {t('s-navbar.item2')}
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="OurTeam" spy offset={-80} duration={500} className="text-red-600">
            {t('s-navbar.item3')}
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="ContactUs" spy offset={-80} duration={500} className="text-red-600">
            {t('s-navbar.item4')}
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <SignUp />
        </NavbarItem>
        <NavbarItem>
          <Login />
        </NavbarItem>
      </NavbarContent>


      <NavbarContent justify="end">
       <SwitchI18n/>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <ScrollLink to="Objective" spy offset={-80} duration={500} className="text-red-600">
          {t('s-navbar.item1')}
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="Services" spy offset={-80} duration={500} className="text-red-600">
          {t('s-navbar.item2')}
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="OurTeam" spy offset={-80} duration={500} className="text-red-600">
          {t('s-navbar.item3')}
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="ContactUs" spy offset={-80} duration={500} className="text-red-600">
          {t('s-navbar.item4')}
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarItem>
            <Login />
          </NavbarItem>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarItem>
            <SignUp />
          </NavbarItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
