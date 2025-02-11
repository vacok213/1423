"use client";

import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { FaGithub } from "react-icons/fa";
import { useTransition } from "react";
import { signInWithGitHub } from "@/actions/auth";

export default function Login() {
  const [isPending, startTransition] = useTransition();

  const handleSignInWithGitHub = async () => {
    startTransition(async () => {
      await signInWithGitHub();
    });
  };

  return (
    <Card className="mx-auto space-y-4 max-w-full w-full sm:max-w-80">
      <CardBody>
        <Button
          isLoading={isPending}
          fullWidth
          className="bg-black text-white"
          startContent={<FaGithub size={22} />}
          onPress={handleSignInWithGitHub}
        >
          GitHub
        </Button>
      </CardBody>
    </Card>
  );
}
