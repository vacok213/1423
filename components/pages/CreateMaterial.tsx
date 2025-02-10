"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";
import { createMaterial } from "@/actions/material";
import { TMaterial } from "@/types/material";

const initialState: TAction<TMaterial> = {
  data: null,
  error: null,
};

export default function CreateMaterial() {
  const [state, formAction, pending] = useActionState(
    createMaterial,
    initialState,
  );

  useEffect(() => {
    if (state.data) {
      redirect("/materials");
    }
  }, [state]);

  return (
    <Card>
      <CardBody>
        <form action={formAction} className="space-y-4">
          <Input
            errorMessage={state.validationErrors?.name}
            isInvalid={!!state.validationErrors?.name}
            isRequired
            name="name"
            label="Имя"
          />
          <Input
            errorMessage={state.validationErrors?.unit}
            isInvalid={!!state.validationErrors?.unit}
            name="unit"
            label="Единица"
          />
          <Input
            errorMessage={state.validationErrors?.cost}
            isInvalid={!!state.validationErrors?.cost}
            isRequired
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
            Создать
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
