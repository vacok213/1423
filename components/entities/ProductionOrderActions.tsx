"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@heroui/button";
import { TDropdownItem } from "@/types/dropdownItem";
import { useActionState, useEffect } from "react";
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
import { TProductionOrder } from "@/types/productionOrder";
import { deleteProductionOrder } from "@/actions/productionOrder";

type TProductionOrderActionsProps = {
  productionOrder: TProductionOrder;
};

const initialState: TAction<TProductionOrder> = {};

export default function ProductionOrderActions({
  productionOrder,
}: TProductionOrderActionsProps) {
  const {
    isOpen: isOpenDeleteProductionOrder,
    onOpen: onOpenDeleteProductionOrder,
    onOpenChange: onOpenChangeDeleteProductionOrder,
  } = useDisclosure();

  const [
    deleteProductionOrderState,
    deleteProductionOrderFormAction,
    deleteProductionOrderPending,
  ] = useActionState(
    deleteProductionOrder.bind(null, productionOrder.id),
    initialState,
  );

  const actions: TDropdownItem[] = [
    {
      key: "edit",
      children: "Изменить",
      as: Link,
      href: `/production-orders/${productionOrder.id}/edit`,
    },
    {
      key: "delete",
      color: "danger",
      children: "Удалить",
      onPress: onOpenDeleteProductionOrder,
    },
  ];

  useEffect(() => {
    if (
      deleteProductionOrderState.data &&
      !deleteProductionOrderState.message &&
      !deleteProductionOrderState.validationErrors
    ) {
      redirect("/production-orders");
    }
  }, [deleteProductionOrderState]);

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
        isOpen={isOpenDeleteProductionOrder}
        onOpenChange={onOpenChangeDeleteProductionOrder}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Вы уверены, что хотите удалить данный производственный заказ?
            </ModalHeader>
            <ModalBody>
              Это действие необратимо, производственный заказ будет полностью
              удален из базы данных!
            </ModalBody>
            <ModalFooter>
              <Form action={deleteProductionOrderFormAction}>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={deleteProductionOrderPending}
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
