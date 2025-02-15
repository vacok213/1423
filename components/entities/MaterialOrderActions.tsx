"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { TMaterialOrder } from "@/types/materialOrder"; // Импортируем тип для заказа на материал
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@heroui/button";
import { TDropdownItem } from "@/types/dropdownItem";
import { useActionState, useEffect } from "react";
import { deleteMaterialOrder } from "@/actions/materialOrder"; // Импортируем функцию для удаления заказа на материал
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

type TMaterialOrderActionsProps = {
  materialOrder: TMaterialOrder;
};

const initialState: TAction<TMaterialOrder> = {};

export default function MaterialOrderActions({
  materialOrder,
}: TMaterialOrderActionsProps) {
  const {
    isOpen: isOpenDeleteOrder,
    onOpen: onOpenDeleteOrder,
    onOpenChange: onOpenChangeDeleteOrder,
  } = useDisclosure();

  const [deleteOrderState, deleteOrderFormAction, deleteOrderPending] =
    useActionState(
      deleteMaterialOrder.bind(null, materialOrder.id),
      initialState,
    );

  const actions: TDropdownItem[] = [
    {
      key: "edit",
      children: "Изменить",
      as: Link,
      href: `/material-orders/${materialOrder.id}/edit`,
    },
    {
      key: "delete",
      color: "danger",
      children: "Удалить",
      onPress: onOpenDeleteOrder,
    },
  ];

  useEffect(() => {
    if (
      deleteOrderState.data &&
      !deleteOrderState.message &&
      !deleteOrderState.validationErrors
    ) {
      redirect("/material-orders");
    }
  }, [deleteOrderState]);

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
        isOpen={isOpenDeleteOrder}
        onOpenChange={onOpenChangeDeleteOrder}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Вы уверены, что хотите удалить данный заказ материалов?
            </ModalHeader>
            <ModalBody>
              Это действие необратимо, заказ материалов будет полностью удален
              из базы данных!
            </ModalBody>
            <ModalFooter>
              <Form action={deleteOrderFormAction}>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={deleteOrderPending}
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
