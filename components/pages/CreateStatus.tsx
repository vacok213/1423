"use client";

import { createStatus } from "@/actions/status";
import { TAction } from "@/types/actions";
import { TStatus } from "@/types/status";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: TAction<TStatus> = {};

export default function CreateStatus() {
  const [state, formAction, pending] = useActionState(
    createStatus,
    initialState,
  );

  useEffect(() => {
    if (state.data && !state.message && !state.validationErrors) {
      redirect("/statuses");
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
          <Button isLoading={pending} color="primary" type="submit">
            Создать
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
