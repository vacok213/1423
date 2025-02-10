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
import { TDropdownItem } from "@/types/dropdown-item";

type TProductActionsProps = {
  product: TProduct;
};

export default function ProductActions({ product }: TProductActionsProps) {
  const actions: TDropdownItem[] = [
    {
      key: "delete",
      color: "danger",
      children: "Удалить",
    },
  ];

  return (
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
  );
}
