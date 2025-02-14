import { TMaterial } from "@/types/material";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { TPaginate } from "@/types/paginate";
import Material from "../entities/Material";
import MaterialActions from "../entities/MaterialActions";
import { Card, CardBody } from "@heroui/card";
import Search from "../widgets/Search";

type TMaterialsProps = TPaginate & {
  materials: TMaterial[];
};

export default function Materials({
  materials,
  total,
  limit,
}: TMaterialsProps) {
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
        <Button color="primary" as={Link} href="/materials/create">
          Создать
        </Button>
      </div>
      {materials.map((material) => (
        <Material
          key={material.id}
          material={material}
          actions={<MaterialActions material={material} />}
        />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
