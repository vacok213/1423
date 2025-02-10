import { TPaginate } from "@/types/paginate";
import Product from "../entities/Product";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { TProduct } from "@/types/product";
import ProductActions from "../entities/ProductActions";

type TProductsProps = TPaginate & {
  products: TProduct[];
};

export default function Products({ products, total, limit }: TProductsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button color="primary" as={Link} href="/products/create">
          Создать
        </Button>
      </div>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          actions={<ProductActions product={product} />}
        />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
