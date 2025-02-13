"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";
import { Form } from "@heroui/form";
import { TProductMaterial } from "@/types/productMaterial";
import { createProductMaterial } from "@/actions/productMaterial";
import { TProduct } from "@/types/product";
import { TMaterial } from "@/types/material";
import { Select, SelectItem } from "@heroui/select";

const initialState: TAction<TProductMaterial> = {};

type CreateProductMaterialProps = {
  products: TProduct[];
  materials: TMaterial[];
};

export default function CreateProductMaterial({
  products,
  materials,
}: CreateProductMaterialProps) {
  const [state, formAction, pending] = useActionState(
    createProductMaterial,
    initialState,
  );

  useEffect(() => {
    if (state.data && !state.message && !state.validationErrors) {
      redirect("/product-materials");
    }
  }, [state]);

  return (
    <Card>
      <CardBody>
        <Form action={formAction}>
          <Select
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
          <Select
            errorMessage={state.validationErrors?.materialId}
            isInvalid={!!state.validationErrors?.materialId}
            name="materialId"
            label="Материал"
          >
            {materials.map((material) => (
              <SelectItem key={material.id} id={material.id}>
                {material.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            errorMessage={state.validationErrors?.quantity}
            isInvalid={!!state.validationErrors?.quantity}
            isDisabled={pending}
            name="quantity"
            label="Количество"
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
