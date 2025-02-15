"use client";

import { useActionState, useEffect } from "react";
import { updateMaterialOrder } from "@/actions/materialOrder";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { TMaterialOrder } from "@/types/materialOrder";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { TMaterial } from "@/types/material";

const initialState: TAction<TMaterialOrder> = {};

type EditMaterialOrderProps = {
  materialOrder: TMaterialOrder;
  materials: TMaterial[];
};

export default function EditMaterialOrder({
  materialOrder,
  materials,
}: EditMaterialOrderProps) {
  const [state, formAction, pending] = useActionState(
    updateMaterialOrder.bind(null, materialOrder.id),
    initialState,
  );

  useEffect(() => {
    if (state.data && !state.message && !state.validationErrors) {
      redirect("/material-orders");
    }
  }, [state]);

  return (
    <Card>
      <CardBody>
        <Form action={formAction}>
          <Select
            errorMessage={state.validationErrors?.materialId}
            isInvalid={!!state.validationErrors?.materialId}
            isDisabled={pending}
            name="materialId"
            label="Материал"
            defaultSelectedKeys={[materialOrder.materialId]}
            items={materials}
          >
            {(material) => (
              <SelectItem key={material.id} id={material.id}>
                {material.name}
              </SelectItem>
            )}
          </Select>
          <Input
            errorMessage={state.validationErrors?.quantity}
            isInvalid={!!state.validationErrors?.quantity}
            isDisabled={pending}
            name="quantity"
            label="Количество"
            type="number"
            defaultValue={materialOrder.quantity.toString()}
          />
          <Input
            errorMessage={state.validationErrors?.completedAt}
            isInvalid={!!state.validationErrors?.completedAt}
            isDisabled={pending}
            name="completedAt"
            label="Дата завершения"
            type="date"
            defaultValue={
              materialOrder.completedAt?.toISOString().split("T")[0]
            }
          />
          <Button isLoading={pending} color="primary" type="submit">
            Обновить
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
