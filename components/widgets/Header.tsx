"use client";

import React, { useTransition } from "react";
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
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Form } from "@heroui/form";

export default function Header() {
  const { data: session } = useSession();

  const {
    isOpen: isOpenSignOut,
    onOpen: onOpenSignOut,
    onOpenChange: onOpenChangeSignOut,
  } = useDisclosure();

  const [signOutIsPending, signOutStartTransition] = useTransition();

  const handleSignOut = async () => {
    signOutStartTransition(async () => {
      await signOut();
    });
  };

  return (
    <>
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
            <Dropdown backdrop="blur">
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
                  key="signOut"
                  onPress={onOpenSignOut}
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
      <Modal
        backdrop="blur"
        isOpen={isOpenSignOut}
        onOpenChange={onOpenChangeSignOut}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Вы уверены, что выйти из учетной записи?
            </ModalHeader>
            <ModalBody>
              После выхода из учетной записи вы потеряете доступ к приватным
              маршрутам и личным данным, до следуещей авторизации.
            </ModalBody>
            <ModalFooter>
              <Form action={handleSignOut}>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={signOutIsPending}
                >
                  Выйти
                </Button>
              </Form>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
