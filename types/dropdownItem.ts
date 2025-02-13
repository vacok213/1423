import { DropdownItem } from "@heroui/dropdown";
import { VariantProps } from "@heroui/theme";

export type TDropdownItem = VariantProps<typeof DropdownItem> & {
  isDisabled?: boolean;
};
