"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";
import { Form } from "@heroui/form";
import { TProductionOrder } from "@/types/productionOrder";
import { createProductionOrder } from "@/actions/productionOrder";
import { TProduct } from "@/types/product";
import { TStatus } from "@/types/status";
import { Select, SelectItem } from "@heroui/select";
import { Alert } from "@heroui/alert";
import { TInsufficientMaterials } from "@/types/insufficientMaterial";
import { createMaterialOrders } from "@/actions/materialOrder";
import { Chip } from "@heroui/chip";

const createProductionOrderInitialState: TAction<
  [TInsufficientMaterials[], TProductionOrder?]
> = {};

const createMaterialOrderInitialState: TAction<{ count: number }> = {};

type CreateProductionOrderProps = {
  products: TProduct[];
  statuses: TStatus[];
};

export default function CreateProductionOrder({
  products,
  statuses,
}: CreateProductionOrderProps) {
  const [
    createProductionOrderState,
    createProductionOrderFormAction,
    createProductionOrderPending,
  ] = useActionState(createProductionOrder, createProductionOrderInitialState);

  const insufficientMaterials: TInsufficientMaterials[] =
    createProductionOrderState.data ? createProductionOrderState.data?.[0] : [];

  const [
    createMaterialOrdersState,
    createMaterialOrdersFormAction,
    createMaterialOrdersPending,
  ] = useActionState(
    createMaterialOrders.bind(null, insufficientMaterials),
    createMaterialOrderInitialState,
  );

  useEffect(() => {
    if (
      createProductionOrderState.data &&
      !createProductionOrderState.message &&
      !createProductionOrderState.validationErrors
    ) {
      redirect("/production-orders");
    }
  }, [createProductionOrderState]);

  return (
    <Card>
      <CardBody>
        <div className="space-y-2">
          {createProductionOrderState.message == "Not enough materials" &&
            !createMaterialOrdersState.data && (
              <Alert color="danger" title="Недостаточно материалов">
                <div className="space-y-2 mt-2">
                  {insufficientMaterials.map((insufficientMaterial) => (
                    <div
                      key={insufficientMaterial.material.id}
                      className="flex gap-2 flex-wrap items-center"
                    >
                      <Chip color="danger">
                        Колличество:{" "}
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
          <Form action={createProductionOrderFormAction}>
            <Select
              errorMessage={
                createProductionOrderState.validationErrors?.productId
              }
              isInvalid={
                !!createProductionOrderState.validationErrors?.productId
              }
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
              errorMessage={
                createProductionOrderState.validationErrors?.quantity
              }
              isInvalid={
                !!createProductionOrderState.validationErrors?.quantity
              }
              isDisabled={createProductionOrderPending}
              name="quantity"
              label="Количество"
              type="number"
            />
            <Select
              errorMessage={
                createProductionOrderState.validationErrors?.statusId
              }
              isInvalid={
                !!createProductionOrderState.validationErrors?.statusId
              }
              name="statusId"
              label="Статус"
              isDisabled={createProductionOrderPending}
              items={statuses}
            >
              {(status) => (
                <SelectItem key={status.id} id={status.id}>
                  {status.name}
                </SelectItem>
              )}
            </Select>
            <Button
              isLoading={createProductionOrderPending}
              color="primary"
              type="submit"
            >
              Создать
            </Button>
          </Form>
        </div>
      </CardBody>
    </Card>
  );
}
