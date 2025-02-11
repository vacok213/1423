"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { TMaterial } from "@/types/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@heroui/button";
import { TDropdownItem } from "@/types/dropdown-item";
import { useActionState, useEffect } from "react";
import { deleteMaterial } from "@/actions/material";
import { TAction } from "@/types/actions";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
} from "@heroui/modal";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";

type TMaterialActionsProps = {
  material: TMaterial;
};

const initialState: TAction<TMaterial> = {
  data: null,
  message: null,
  validationErrors: null,
};

export default function MaterialActions({ material }: TMaterialActionsProps) {
  const router = useRouter();

  const {
    isOpen: isOpenDeleteMaterial,
    onOpen: onOpenDeleteMaterial,
    onOpenChange: onOpenChangeDeleteMaterial,
  } = useDisclosure();

  const [deleteMaterialState, deleteMaterialFormAction, deleteMaterialPending] =
    useActionState(deleteMaterial.bind(null, material.id), initialState);

  const actions: TDropdownItem[] = [
    {
      key: "edit",
      children: "Изменить",
      as: Link,
      href: `/materials/${material.id}/edit`,
    },
    {
      key: "delete",
      color: "danger",
      children: "Удалить",
      onPress: onOpenDeleteMaterial,
    },
  ];

  useEffect(() => {
    if (
      deleteMaterialState.data &&
      !deleteMaterialState.message &&
      !deleteMaterialState.validationErrors
    ) {
      router.refresh();
    }
  }, [deleteMaterialState]);

  return (
    <>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button isIconOnly variant="light">
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
        isOpen={isOpenDeleteMaterial}
        onOpenChange={onOpenChangeDeleteMaterial}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Вы уверены, что хотите удалить данный материал?
            </ModalHeader>
            <ModalBody>
              Это действие необратимо, продукт будет полностью удален из базы
              данных!
            </ModalBody>
            <ModalFooter>
              <Form action={deleteMaterialFormAction}>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={deleteMaterialPending}
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
