"use client";

import { useActionState, useEffect } from "react";
import { createProduct } from "@/actions/product";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { TProduct } from "@/types/product";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";

const initialState: TAction<TProduct, string> = {
  data: null,
  error: null,
};

export default function CreateProduct() {
  const [state, formAction, pending] = useActionState(
    createProduct,
    initialState,
  );

  useEffect(() => {
    if (state.data) {
      redirect("/products");
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
            errorMessage={state.validationErrors?.description}
            isInvalid={!!state.validationErrors?.description}
            name="description"
            label="Описание"
          />
          <Input
            errorMessage={state.validationErrors?.price}
            isInvalid={!!state.validationErrors?.price}
            isRequired
            name="price"
            label="Цена"
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
