"use client";

import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <Card className="mx-auto space-y-4 max-w-full w-full sm:max-w-80">
      <CardBody>
        <Button
          fullWidth
          className="bg-black text-white"
          startContent={<FaGithub size={22} />}
          onPress={async () => await signIn("github", { callbackUrl: "/" })}
        >
          GitHub
        </Button>
      </CardBody>
    </Card>
  );
}
