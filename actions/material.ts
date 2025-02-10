"use server";

import { materialSchema } from "@/schemas/material";
import { TAction } from "@/types/actions";
import { TMaterial } from "@/types/material";
import { prisma } from "@/utils/prisma";

export async function getMaterials(
  take: number,
  skip: number,
): Promise<TAction<[TMaterial[], number]>> {
  try {
    const res = await prisma.$transaction([
      prisma.material.findMany({
        take,
        skip,
      }),
      prisma.material.count(),
    ]);

    return {
      data: res as [TMaterial[], number],
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Critical error",
    };
  }
}

export async function createMaterial(
  state: TAction<TMaterial>,
  formData: FormData,
): Promise<TAction<TMaterial>> {
  try {
    const name = formData.get("name") as string;
    const unit = formData.get("unit") as string;
    const cost = parseFloat(formData.get("cost") as string);

    const validationResult = materialSchema.safeParse({
      name,
      unit,
      cost,
    });

    if (!validationResult.success) {
      const validationErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        const fieldName = err.path[0];
        validationErrors[fieldName] = err.message;
      });

      return {
        data: null,
        error: "Validation error",
        validationErrors,
      };
    }

    const validatedData = validationResult.data;

    const res = await prisma.material.create({
      data: {
        name: validatedData.name,
        unit: validatedData.unit,
        cost: validatedData.cost,
      },
    });

    return {
      data: res as TMaterial,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Critical error",
    };
  }
}
