"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";
import { Form } from "@heroui/form";
import { TProductionOrder } from "@/types/productionOrder";
import { updateProductionOrder } from "@/actions/productionOrder";
import { TProduct } from "@/types/product";
import { TStatus } from "@/types/status";
import { Select, SelectItem } from "@heroui/select";

const initialState: TAction<TProductionOrder> = {};

type EditProductionOrderProps = {
  products: TProduct[];
  statuses: TStatus[];
  productionOrder: TProductionOrder;
};

export default function EditProductionOrder({
  products,
  statuses,
  productionOrder,
}: EditProductionOrderProps) {
  const [state, formAction, pending] = useActionState(
    updateProductionOrder.bind(null, productionOrder.id),
    initialState,
  );

  useEffect(() => {
    if (state.data && !state.message && !state.validationErrors) {
      redirect("/production-orders");
    }
  }, [state]);

  return (
    <Card>
      <CardBody>
        <Form action={formAction}>
          <Select
            defaultSelectedKeys={[productionOrder.productId]}
            errorMessage={state.validationErrors?.productId}
            isInvalid={!!state.validationErrors?.productId}
            name="productId"
            label="Продукт"
          >
            {products.map((product) => (
              <SelectItem key={product.id} id={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            defaultValue={productionOrder.quantity.toString()}
            errorMessage={state.validationErrors?.quantity}
            isInvalid={!!state.validationErrors?.quantity}
            isDisabled={pending}
            name="quantity"
            label="Количество"
            type="number"
          />
          <Select
            defaultSelectedKeys={[productionOrder.statusId]}
            errorMessage={state.validationErrors?.statusId}
            isInvalid={!!state.validationErrors?.statusId}
            name="statusId"
            label="Статус"
          >
            {statuses.map((status) => (
              <SelectItem key={status.id} id={status.id}>
                {status.name}
              </SelectItem>
            ))}
          </Select>
          <Button isLoading={pending} color="primary" type="submit">
            Обновить
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
