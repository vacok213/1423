import { TPaginate } from "@/types/paginate";
import ProductMaterial from "../entities/ProductMaterial";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { TProductMaterial } from "@/types/productMaterial";
import ProductMaterialActions from "../entities/ProductMaterialActions";

type TProductMaterialsProps = TPaginate & {
  productMaterials: TProductMaterial[];
};

export default function ProductMaterials({
  productMaterials,
  total,
  limit,
}: TProductMaterialsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button color="primary" as={Link} href="/product-materials/create">
          Создать
        </Button>
      </div>
      {productMaterials.map((productMaterial) => (
        <ProductMaterial
          key={productMaterial.id}
          productMaterial={productMaterial}
          actions={<ProductMaterialActions productMaterial={productMaterial} />}
        />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
