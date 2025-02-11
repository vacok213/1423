"use client";

import { TProduct } from "@/types/product";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { useActionState, useEffect } from "react";
import { TAction } from "@/types/actions";
import { updateProduct } from "@/actions/product";
import { redirect } from "next/navigation";
import { Button } from "@heroui/button";

type TEditProductProps = {
  product: TProduct;
};

const initialState: TAction<TProduct> = {};

export default function EditProduct({ product }: TEditProductProps) {
  const [state, formAction, pending] = useActionState(
    updateProduct.bind(null, product.id),
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
            defaultValue={product.name}
            errorMessage={state.validationErrors?.name}
            isInvalid={!!state.validationErrors?.name}
            isDisabled={pending}
            name="name"
            label="Имя"
          />
          <Input
            defaultValue={product.description}
            name="description"
            errorMessage={state.validationErrors?.description}
            isInvalid={!!state.validationErrors?.description}
            isDisabled={pending}
            label="Описание"
          />
          <Input
            defaultValue={product.price.toString()}
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
            Обновить
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
