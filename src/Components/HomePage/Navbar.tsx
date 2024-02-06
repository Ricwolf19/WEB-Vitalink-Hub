import React from "react";
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Logo } from "./Logo.jsx";
import { Link as ScrollLink} from "react-scroll";

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
          <ScrollLink to="Objective" smooth spy offset={-80} className="text-red-600">
            Porpuse
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="Services" smooth spy offset={-80} className="text-red-600">
            Services
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="OurTeam" smooth spy offset={-80} className="text-red-600">
            Our Team
          </ScrollLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} href="/signup" color="danger" variant="light">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/signup" color="danger" variant="ghost">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavbarItem isActive className=" pb-4">
            <ScrollLink to="Objective" smooth spy offset={-80} className="text-red-600">
              Porpuse
            </ScrollLink>
          </NavbarItem>
          <NavbarItem isActive className=" pb-4">
            <ScrollLink to="Services" smooth spy offset={-80} className="text-red-600">
              Services
            </ScrollLink>
          </NavbarItem>
          <NavbarItem isActive className=" pb-4">
            <ScrollLink to="OurTeam" smooth spy offset={-80} className="text-red-600">
              Our Team
            </ScrollLink>
          </NavbarItem>
          <NavbarItem isActive className=" pb-4">
            <ScrollLink to="ContactUs" smooth spy offset={-80} className="text-red-600">
              Contact Us
            </ScrollLink>
          </NavbarItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
