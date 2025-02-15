"use server";

import { materialSchema } from "@/schemas/material";
import { TAction } from "@/types/actions";
import { TMaterial } from "@/types/material";
import { prisma } from "@/utils/prisma";
import { ValidationErrors } from "@react-types/shared";

export async function getMaterial(id: string): Promise<TAction<TMaterial>> {
  try {
    const material = await prisma.material.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return {
      data: material,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getMaterials(
  take?: number,
  skip?: number,
  query?: string,
): Promise<TAction<[TMaterial[], number]>> {
  try {
    const decodedQuery = query ? decodeURIComponent(query) : undefined;

    const res = await prisma.$transaction([
      prisma.material.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  name: {
                    contains: decodedQuery,
                    mode: "insensitive",
                  },
                },
              ],
            },
          ],
        },
        take,
        skip,
      }),
      prisma.material.count({
        where: {
          AND: [
            {
              OR: [
                {
                  name: {
                    contains: decodedQuery,
                    mode: "insensitive",
                  },
                },
              ],
            },
          ],
        },
      }),
    ]);

    return {
      data: res as [TMaterial[], number],
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
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
    const quantityInStock = parseFloat(
      formData.get("quantityInStock") as string,
    );

    const validationResult = materialSchema.safeParse({
      name,
      unit,
      cost,
      quantityInStock,
    });

    if (!validationResult.success) {
      const validationErrors: ValidationErrors = {};

      validationResult.error.errors.forEach((err) => {
        const fieldName = err.path[0];
        validationErrors[fieldName] = err.message;
      });

      return {
        data: null,
        message: "Validation error",
        validationErrors,
      };
    }

    const validatedData = validationResult.data;

    const material = await prisma.material.create({
      data: {
        name: validatedData.name,
        unit: validatedData.unit,
        cost: validatedData.cost,
        quantityInStock: validatedData.quantityInStock,
      },
    });

    return {
      data: material,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function updateMaterial(
  id: string,
  state: TAction<TMaterial>,
  formData: FormData,
): Promise<TAction<TMaterial>> {
  try {
    const name = formData.get("name") as string;
    const unit = formData.get("unit") as string;
    const cost = parseFloat(formData.get("cost") as string);
    const quantityInStock = parseFloat(
      formData.get("quantityInStock") as string,
    );

    const validationResult = materialSchema.safeParse({
      name,
      unit,
      cost,
      quantityInStock,
    });

    if (!validationResult.success) {
      const validationErrors: ValidationErrors = {};

      validationResult.error.errors.forEach((err) => {
        const fieldName = err.path[0];
        validationErrors[fieldName] = err.message;
      });

      return {
        data: null,
        message: "Validation error",
        validationErrors,
      };
    }

    const validatedData = validationResult.data;

    const material = await prisma.material.update({
      where: {
        id,
      },
      data: {
        name: validatedData.name,
        unit: validatedData.unit,
        cost: validatedData.cost,
        quantityInStock: validatedData.quantityInStock,
      },
    });

    return {
      data: material,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteMaterial(id: string): Promise<TAction<TMaterial>> {
  try {
    const materal = await prisma.material.delete({
      where: { id },
    });

    return {
      data: materal,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
