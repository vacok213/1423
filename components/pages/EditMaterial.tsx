"use client";

import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { useActionState, useEffect } from "react";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";
import { Button } from "@heroui/button";
import { TMaterial } from "@/types/material";
import { updateMaterial } from "@/actions/material";

type TEditMaterialProps = {
  material: TMaterial;
};

const initialState: TAction<TMaterial> = {};

export default function EditProduct({ material }: TEditMaterialProps) {
  const [state, formAction, pending] = useActionState(
    updateMaterial.bind(null, material.id),
    initialState,
  );

  useEffect(() => {
    if (state.data && !state.message && !state.validationErrors) {
      redirect("/materials");
    }
  }, [state]);

  return (
    <Card>
      <CardBody>
        <Form action={formAction}>
          <Input
            defaultValue={material.name}
            errorMessage={state.validationErrors?.name}
            isInvalid={!!state.validationErrors?.name}
            isDisabled={pending}
            name="name"
            label="Имя"
          />
          <Input
            defaultValue={material.unit}
            name="unit"
            errorMessage={state.validationErrors?.unit}
            isInvalid={!!state.validationErrors?.unit}
            isDisabled={pending}
            label="Единица"
          />
          <Input
            defaultValue={material.cost.toString()}
            errorMessage={state.validationErrors?.cost}
            isInvalid={!!state.validationErrors?.cost}
            isDisabled={pending}
            name="cost"
            label="Цена за единицу"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">₽</span>
              </div>
            }
            type="number"
          />
          <Button isLoading={pending} color="primary" type="submit">
            Обновить
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
