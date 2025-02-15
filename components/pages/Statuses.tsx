import { TStatus } from "@/types/status";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { TPaginate } from "@/types/paginate";
import Status from "../entities/Status";
import StatusActions from "../entities/StatusActions";
import { Card, CardBody } from "@heroui/card";
import Search from "../widgets/Search";

type TStatusesProps = TPaginate & {
  statuses: TStatus[];
};

export default function Statuses({ statuses, total, limit }: TStatusesProps) {
  return (
    <div className="space-y-4">
      <Card isBlurred className="sticky top-40 z-30">
        <CardBody>
          <div className="space-y-4">
            <Search param="query" label="Поиск" />
          </div>
        </CardBody>
      </Card>
      <div className="flex justify-end">
        <Button color="primary" as={Link} href="/statuses/create">
          Создать
        </Button>
      </div>
      {statuses.length > 0 && (
        <Card>
          <CardBody>
            <div className="flex gap-2 flex-wrap">
              {statuses.map((status) => (
                <Status
                  key={status.id}
                  status={status}
                  actions={<StatusActions status={status} />}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      )}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
