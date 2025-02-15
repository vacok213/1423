"use client";

import { updateStatus } from "@/actions/status";
import { TAction } from "@/types/actions";
import { TStatus } from "@/types/status";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: TAction<TStatus> = {};

type TEditStatus = {
  status: TStatus;
};

export default function EditStatus({ status }: TEditStatus) {
  const [state, formAction, pending] = useActionState(
    updateStatus.bind(null, status.id),
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
            defaultValue={status.name}
            errorMessage={state.validationErrors?.name}
            isInvalid={!!state.validationErrors?.name}
            isDisabled={pending}
            name="name"
            label="Имя"
          />
          <Button isLoading={pending} color="primary" type="submit">
            Обновить
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
