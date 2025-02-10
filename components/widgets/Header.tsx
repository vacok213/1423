"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import Logo from "./Logo";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { signOut, useSession } from "next-auth/react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const { data: session } = useSession();

  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {session?.user ? (
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                className="cursor-pointer"
                size="sm"
                isBordered
                color="default"
                name={session.user?.name ?? undefined}
                src={session.user.image ?? undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="delete"
                onPress={() => signOut()}
                color="danger"
              >
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href="/login">
              Войти
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
