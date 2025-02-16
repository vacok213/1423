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
import { Alert } from "@heroui/alert";
import { Chip } from "@heroui/chip";
import { TInsufficientMaterials } from "@/types/insufficientMaterial";
import { createMaterialOrders } from "@/actions/materialOrder";

const initialState: TAction<[TInsufficientMaterials[], TProductionOrder?]> = {};

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

  const insufficientMaterials: TInsufficientMaterials[] = state.data
    ? state.data[0]
    : [];

  const [
    createMaterialOrdersState,
    createMaterialOrdersFormAction,
    createMaterialOrdersPending,
  ] = useActionState(createMaterialOrders.bind(null, insufficientMaterials), {
    data: null,
    message: null,
  });

  useEffect(() => {
    if (state.data && !state.message && !state.validationErrors) {
      redirect("/production-orders");
    }
  }, [state]);

  return (
    <Card>
      <CardBody>
        <div className="space-y-2">
          {state.message === "Not enough materials" &&
            !createMaterialOrdersState.data && (
              <Alert color="danger" title="Недостаточно материалов">
                <div className="space-y-2 mt-2">
                  {insufficientMaterials.map((insufficientMaterial) => (
                    <div
                      key={insufficientMaterial.material.id}
                      className="flex gap-2 flex-wrap items-center"
                    >
                      <Chip color="danger">
                        Количество:{" "}
                        <span className="font-bold">
                          {insufficientMaterial.required}
                        </span>
                      </Chip>
                      <span className="font-bold">
                        {insufficientMaterial.material.name}
                      </span>
                    </div>
                  ))}
                  <Form action={createMaterialOrdersFormAction}>
                    <Button
                      isLoading={createMaterialOrdersPending}
                      color="danger"
                      type="submit"
                    >
                      Заказать
                    </Button>
                  </Form>
                </div>
              </Alert>
            )}
          <Form action={formAction}>
            <Select
              defaultSelectedKeys={[productionOrder.productId]}
              errorMessage={state.validationErrors?.productId}
              isInvalid={!!state.validationErrors?.productId}
              name="productId"
              label="Продукт"
              items={products}
            >
              {(product) => (
                <SelectItem key={product.id} id={product.id}>
                  {product.name}
                </SelectItem>
              )}
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
              items={statuses}
            >
              {(status) => (
                <SelectItem key={status.id} id={status.id}>
                  {status.name}
                </SelectItem>
              )}
            </Select>
            <Button isLoading={pending} color="primary" type="submit">
              Обновить
            </Button>
          </Form>
        </div>
      </CardBody>
    </Card>
  );
}
