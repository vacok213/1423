"use client";

import { useActionState, useEffect } from "react";
import { createProduct } from "@/actions/product";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { TProduct } from "@/types/product";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";
import { Form } from "@heroui/form";

const initialState: TAction<TProduct> = {};

export default function CreateProduct() {
  const [state, formAction, pending] = useActionState(
    createProduct,
    initialState,
  );

  useEffect(() => {
    if (state.data && !state.message && !state.validationErrors) {
      redirect("/products");
    }
  }, [state]);

  return (
    <Card>
      <CardBody>
        <Form action={formAction}>
          <Input
            errorMessage={state.validationErrors?.name}
            isInvalid={!!state.validationErrors?.name}
            isDisabled={pending}
            name="name"
            label="Имя"
          />
          <Input
            name="description"
            errorMessage={state.validationErrors?.description}
            isInvalid={!!state.validationErrors?.description}
            isDisabled={pending}
            label="Описание"
          />
          <Input
            errorMessage={state.validationErrors?.price}
            isInvalid={!!state.validationErrors?.price}
            isDisabled={pending}
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
        </Form>
      </CardBody>
    </Card>
  );
}
