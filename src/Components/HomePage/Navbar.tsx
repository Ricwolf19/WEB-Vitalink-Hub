import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Switch,
} from "@nextui-org/react";

import { Logo } from "./Icons";
import { Link as ScrollLink } from "react-scroll"; //Se puede adaptar nombre a lo que se agarre de el paquete
import { Login } from "../SignIn/Login";
import { SignUp } from "../SignIn/SignUp";
import { useTranslation } from "react-i18next";

export function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [t, i18n] = useTranslation("global");

  const handleChangeLenguage = (option: boolean) => {
    setIsSelected(option)
    const lenguage = option ? 'es' : 'en';
    i18n.changeLanguage(lenguage)
  }

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
        <Switch
          defaultSelected
          size="lg"
          color="warning"
          isSelected={isSelected}
          onValueChange={handleChangeLenguage}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <img src="https://flagcdn.com/16x12/es.png" className={className} />
            ) : (
              <img src="https://flagcdn.com/16x12/us.png" className={className} />
            )
          }
        >
          <p className="text-small text-default-500">{isSelected ? "ES" : "EN"}</p>
        </Switch>

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
