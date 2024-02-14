import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Link as LinkDom } from 'react-router-dom'
import { Logo } from "./Logo.jsx";
import { Link as ScrollLink } from "react-scroll"; //Se puede adaptar nombre a lo que se agarre de el paquete

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
          <p className="font-bold text-inherit text-red-500">VitaLink</p>
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
          <Button as={LinkDom} to={"/SignUp"} color="danger" variant="solid">
            SignUp
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        <Button as={LinkDom} to={"/Login"} color="danger" variant="ghost">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
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
        <NavbarMenuItem>
          <NavbarItem>
          <Button as={LinkDom} to={"/SignUp"} color="danger" variant="solid">
            SignUp
          </Button>
          </NavbarItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
