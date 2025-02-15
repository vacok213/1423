"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { TStatus } from "@/types/status";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@heroui/button";
import { TDropdownItem } from "@/types/dropdownItem";
import { useActionState, useEffect } from "react";
import { deleteStatus } from "@/actions/status";
import { TAction } from "@/types/actions";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
} from "@heroui/modal";
import { redirect } from "next/navigation";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";

type TStatusActionsProps = {
  status: TStatus;
};

const initialState: TAction<TStatus> = {};

export default function StatusActions({ status }: TStatusActionsProps) {
  const {
    isOpen: isOpenDeleteStatus,
    onOpen: onOpenDeleteStatus,
    onOpenChange: onOpenChangeDeleteStatus,
  } = useDisclosure();

  const [deleteStatusState, deleteStatusFormAction, deleteStatusPending] =
    useActionState(deleteStatus.bind(null, status.id), initialState);

  const actions: TDropdownItem[] = [
    {
      key: "edit",
      children: "Изменить",
      as: Link,
      href: `/statuses/${status.id}/edit`,
    },
    {
      key: "delete",
      color: "danger",
      children: "Удалить",
      onPress: onOpenDeleteStatus,
    },
  ];

  useEffect(() => {
    if (
      deleteStatusState.data &&
      !deleteStatusState.message &&
      !deleteStatusState.validationErrors
    ) {
      redirect("/statuses");
    }
  }, [deleteStatusState]);

  return (
    <>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button size="sm" isIconOnly variant="light">
            <IoMdArrowDropdown size={22} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {actions
            .filter((item) => !item.isDisabled)
            .map(({ key, isDisabled, ...item }) => (
              <DropdownItem key={key} {...item} />
            ))}
        </DropdownMenu>
      </Dropdown>
      <Modal
        backdrop="blur"
        isOpen={isOpenDeleteStatus}
        onOpenChange={onOpenChangeDeleteStatus}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Вы уверены, что хотите удалить данный статус?
            </ModalHeader>
            <ModalBody>
              Это действие необратимо, статус будет полностью удален из базы
              данных!
            </ModalBody>
            <ModalFooter>
              <Form action={deleteStatusFormAction}>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={deleteStatusPending}
                >
                  Удалить
                </Button>
              </Form>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
