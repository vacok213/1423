"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { TProductMaterial } from "@/types/productMaterial";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@heroui/button";
import { TDropdownItem } from "@/types/dropdownItem";
import { useActionState, useEffect } from "react";
import { deleteProductMaterial } from "@/actions/productMaterial";
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

type TProductMaterialActionsProps = {
  productMaterial: TProductMaterial;
};

const initialState: TAction<TProductMaterial> = {};

export default function ProductMaterialActions({
  productMaterial,
}: TProductMaterialActionsProps) {
  const {
    isOpen: isOpenDeleteProductMaterial,
    onOpen: onOpenDeleteProductMaterial,
    onOpenChange: onOpenChangeDeleteProductMaterial,
  } = useDisclosure();

  const [
    deleteProductMaterialState,
    deleteProductMaterialFormAction,
    deleteProductMaterialPending,
  ] = useActionState(
    deleteProductMaterial.bind(null, productMaterial.id),
    initialState,
  );

  const actions: TDropdownItem[] = [
    {
      key: "edit",
      children: "Изменить",
      as: Link,
      href: `/product-materials/${productMaterial.id}/edit`,
    },
    {
      key: "delete",
      color: "danger",
      children: "Удалить",
      onPress: onOpenDeleteProductMaterial,
    },
  ];

  useEffect(() => {
    if (
      deleteProductMaterialState.data &&
      !deleteProductMaterialState.message &&
      !deleteProductMaterialState.validationErrors
    ) {
      redirect("/product-materials");
    }
  }, [deleteProductMaterialState]);

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
        isOpen={isOpenDeleteProductMaterial}
        onOpenChange={onOpenChangeDeleteProductMaterial}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Вы уверены, что хотите удалить данный состав продукта?
            </ModalHeader>
            <ModalBody>
              Это действие необратимо, состав продукта будет полностью удален из
              базы данных!
            </ModalBody>
            <ModalFooter>
              <Form action={deleteProductMaterialFormAction}>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={deleteProductMaterialPending}
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
