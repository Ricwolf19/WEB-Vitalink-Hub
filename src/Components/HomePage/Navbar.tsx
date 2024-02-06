import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Logo } from "./Logo.jsx";
import { Link } from "react-scroll";

export function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Porpuse",
    "Services",
    "Our Team",
    "Contact Us",
  ];

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
          <Link to="Objective" smooth spy offset={-80} className="text-red-600">
            Porpuse
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="Services" smooth spy offset={-80} className="text-red-600">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="OurTeam" smooth spy offset={-80} className="text-red-600">
            Our Team
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="danger" href="#" variant="flat">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="danger" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavbarItem isActive className=" pb-4">
            <Link to="Objective" smooth spy offset={-80} className="text-red-600">
              Porpuse
            </Link>
          </NavbarItem>
          <NavbarItem isActive className=" pb-4">
            <Link to="Services" smooth spy offset={-80} className="text-red-600">
              Services
            </Link>
          </NavbarItem>
          <NavbarItem isActive className=" pb-4">
            <Link to="OurTeam" smooth spy offset={-80} className="text-red-600">
              Our Team
            </Link>
          </NavbarItem>
          <NavbarItem isActive className=" pb-4">
            <Link to="ContactUs" smooth spy offset={-80} className="text-red-600">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
