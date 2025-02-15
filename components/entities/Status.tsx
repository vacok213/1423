import { TStatus } from "@/types/status";
import { Chip } from "@heroui/chip";

type TStatusProps = {
  status: TStatus;
  actions?: React.ReactNode;
};

export default function Status({ status, actions }: TStatusProps) {
  return <Chip endContent={actions}>{status.name}</Chip>;
}
