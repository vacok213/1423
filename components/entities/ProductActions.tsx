"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { TProduct } from "@/types/product";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@heroui/button";
import { TDropdownItem } from "@/types/dropdownItem";
import { useActionState, useEffect } from "react";
import { deleteProduct } from "@/actions/product";
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

type TProductActionsProps = {
  product: TProduct;
};

const initialState: TAction<TProduct> = {};

export default function ProductActions({ product }: TProductActionsProps) {
  const {
    isOpen: isOpenDeleteProduct,
    onOpen: onOpenDeleteProduct,
    onOpenChange: onOpenChangeDeleteProduct,
  } = useDisclosure();

  const [deleteProductState, deleteProductFormAction, deleteProductPending] =
    useActionState(deleteProduct.bind(null, product.id), initialState);

  const actions: TDropdownItem[] = [
    {
      key: "edit",
      children: "Изменить",
      as: Link,
      href: `/products/${product.id}/edit`,
    },
    {
      key: "delete",
      color: "danger",
      children: "Удалить",
      onPress: onOpenDeleteProduct,
    },
  ];

  useEffect(() => {
    if (
      deleteProductState.data &&
      !deleteProductState.message &&
      !deleteProductState.validationErrors
    ) {
      redirect("/products");
    }
  }, [deleteProductState]);

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
        isOpen={isOpenDeleteProduct}
        onOpenChange={onOpenChangeDeleteProduct}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Вы уверены, что хотите удалить данный продукт?
            </ModalHeader>
            <ModalBody>
              Это действие необратимо, продукт будет полностью удален из базы
              данных!
            </ModalBody>
            <ModalFooter>
              <Form action={deleteProductFormAction}>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={deleteProductPending}
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
