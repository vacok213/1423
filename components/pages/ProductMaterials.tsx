import { TPaginate } from "@/types/paginate";
import ProductMaterial from "../entities/ProductMaterial";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { TProductMaterial } from "@/types/productMaterial";
import ProductMaterialActions from "../entities/ProductMaterialActions";
import SelectSearch from "../widgets/SelectSearch";
import { Card, CardBody } from "@heroui/card";
import { TProduct } from "@/types/product";
import { TMaterial } from "@/types/material";

type TProductMaterialsProps = TPaginate & {
  productMaterials: TProductMaterial[];
  products: TProduct[];
  materials: TMaterial[];
};

export default function ProductMaterials({
  productMaterials,
  products,
  materials,
  total,
  limit,
}: TProductMaterialsProps) {
  const productsToItems = products.map((product) => ({
    id: product.id,
    label: product.name,
  }));

  const statusesToItems = materials.map((material) => ({
    id: material.id,
    label: material.name,
  }));

  return (
    <div className="space-y-4">
      <Card isBlurred className="sticky top-40 z-30">
        <CardBody>
          <div className="space-y-4">
            <SelectSearch
              param="productId"
              items={productsToItems}
              label="Выберете продукт"
            />
            <SelectSearch
              param="materialId"
              items={statusesToItems}
              label="Выберете материал"
            />
          </div>
        </CardBody>
      </Card>
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
