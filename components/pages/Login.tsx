"use client";

import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { FaGithub, FaYandex } from "react-icons/fa";
import { useTransition } from "react";
import { signInWith } from "@/actions/auth";

export default function Login() {
  const [isPendingGitHub, startTransitionGitHub] = useTransition();
  const [isPendingYandex, startTransitionYandex] = useTransition();

  const handleSignInWithGitHub = async () => {
    startTransitionGitHub(async () => {
      await signInWith("github");
    });
  };

  const handleSignInWithYandex = async () => {
    startTransitionYandex(async () => {
      await signInWith("yandex");
    });
  };

  return (
    <Card className="mx-auto space-y-4 max-w-full w-full sm:max-w-80">
      <CardBody>
        <div className="space-y-2">
          <Button
            isLoading={isPendingGitHub}
            fullWidth
            className="bg-black text-white"
            startContent={<FaGithub size={22} />}
            onPress={handleSignInWithGitHub}
          >
            GitHub
          </Button>
          <Button
            isLoading={isPendingYandex}
            fullWidth
            className="bg-[#ff0000] text-white"
            startContent={<FaYandex size={22} />}
            onPress={handleSignInWithYandex}
          >
            Яндекс
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
