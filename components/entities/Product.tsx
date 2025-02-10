import { TProduct } from "@/types/product";
import formatPrice from "@/utils/formatPrice";
import { Card, CardBody } from "@heroui/card";

type TProductProps = {
  product: TProduct;
  actions?: React.ReactNode;
};

export default function Product({ product, actions }: TProductProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between gap-4">
          <div>
            <h2 className="font-bold text-lg">{product.name}</h2>
            {product.description || <p>{product.description}</p>}
            <p className="font-bold">{formatPrice(product.price)}</p>
          </div>
          {actions}
        </div>
      </CardBody>
    </Card>
  );
}
