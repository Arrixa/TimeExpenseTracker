import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import SigninButton from "./SigninButton";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/20/solid";

const Appbar = () => {
  return (
    <Navbar isBordered>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            className="text-white hover:text-sky-500 transition-colors"
            color="foreground"
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Appbar;