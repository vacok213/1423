"use client";

import { useActionState, useEffect } from "react";
import { createMaterialOrder } from "@/actions/materialOrder";
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

type CreateMaterialOrderProps = {
  materials: TMaterial[];
};

export default function CreateMaterialOrder({
  materials,
}: CreateMaterialOrderProps) {
  const [state, formAction, pending] = useActionState(
    createMaterialOrder,
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
          />
          <Input
            errorMessage={state.validationErrors?.completedAt}
            isInvalid={!!state.validationErrors?.completedAt}
            isDisabled={pending}
            name="completedAt"
            label="Дата завершения"
            type="date"
          />
          <Button isLoading={pending} color="primary" type="submit">
            Создать
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
