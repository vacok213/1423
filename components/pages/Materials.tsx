import { TMaterial } from "@/types/material";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { TPaginate } from "@/types/paginate";
import Material from "../entities/Material";
import MaterialActions from "../entities/MaterialActions";

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
