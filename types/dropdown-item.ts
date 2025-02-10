import { DropdownItem, VariantProps } from "@heroui/react";

export type TDropdownItem = VariantProps<typeof DropdownItem> & {
  isDisabled?: boolean;
};
