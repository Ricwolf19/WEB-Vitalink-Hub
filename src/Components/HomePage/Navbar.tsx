import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { Logo } from "./Icons";
import { Link as ScrollLink } from "react-scroll"; //Se puede adaptar nombre a lo que se agarre de el paquete
import { Login } from "../SignIn/Login";
import { SignUp } from "../SignIn/SignUp";

export function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


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
            Objective
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="Services" spy offset={-80} duration={500} className="text-red-600">
            Services
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="OurTeam" spy offset={-80} duration={500} className="text-red-600">
            Our Team
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="ContactUs" spy offset={-80} duration={500} className="text-red-600">
            Contact Us
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <SignUp />
        </NavbarItem>
      </NavbarContent>


      <NavbarContent justify="end">
        <NavbarItem>
          <Login />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavbarItem>
            <SignUp />
          </NavbarItem>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="Objective" spy offset={-80} duration={500} className="text-red-600">
            Objective
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="Services" spy offset={-80} duration={500} className="text-red-600">
            Services
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="OurTeam" spy offset={-80} duration={500} className="text-red-600">
            Our Team
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="ContactUs" spy offset={-80} duration={500} className="text-red-600">
            Contact Us
          </ScrollLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
