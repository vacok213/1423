"use server";

import { materialOrderSchema } from "@/schemas/materialOrder";
import { TAction } from "@/types/actions";
import { TInsufficientMaterials } from "@/types/insufficientMaterial";
import { TMaterialOrder } from "@/types/materialOrder";
import { prisma } from "@/utils/prisma";
import { ValidationErrors } from "@react-types/shared";

export async function getMaterialOrder(
  id: string,
): Promise<TAction<TMaterialOrder>> {
  try {
    const materialOrder = await prisma.materialOrder.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        material: true,
      },
    });

    return {
      data: materialOrder,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function createMaterialOrder(
  state: TAction<TMaterialOrder>,
  formData: FormData,
): Promise<TAction<TMaterialOrder>> {
  try {
    const materialId = formData.get("materialId") as string;
    const quantity = parseFloat(formData.get("quantity") as string);
    const completedAt = formData.get("completedAt") as string | null;

    const validationResult = materialOrderSchema.safeParse({
      materialId,
      quantity,
      completedAt,
    });

    if (!validationResult.success) {
      const validationErrors: ValidationErrors = {};

      validationResult.error.errors.forEach((err) => {
        const fieldName = err.path[0];
        validationErrors[fieldName] = err.message;
      });

      return {
        message: "Validation error",
        validationErrors,
      };
    }

    const validatedData = validationResult.data;

    const materialOrder = await prisma.materialOrder.create({
      data: {
        materialId: validatedData.materialId,
        quantity: validatedData.quantity,
        completedAt: validatedData.completedAt
          ? new Date(validatedData.completedAt)
          : null,
      },
    });

    return {
      data: materialOrder,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function createMaterialOrders(
  insufficientMaterials: TInsufficientMaterials[],
  state: TAction<{ count: number }>,
): Promise<TAction<{ count: number }>> {
  try {
    if (insufficientMaterials.length === 0) {
      return {
        message: "No insufficient materials to create orders.",
      };
    }

    const ordersData = insufficientMaterials.map((item) => ({
      materialId: item.material.id,
      quantity: item.required,
    }));

    const createdOrders = await prisma.materialOrder.createMany({
      data: ordersData,
    });

    return {
      data: createdOrders,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function updateMaterialOrder(
  id: string,
  state: TAction<TMaterialOrder>,
  formData: FormData,
): Promise<TAction<TMaterialOrder>> {
  try {
    const materialId = formData.get("materialId") as string;
    const quantity = parseFloat(formData.get("quantity") as string);
    const completedAt = formData.get("completedAt") as string | null;

    const validationResult = materialOrderSchema.safeParse({
      materialId,
      quantity,
      completedAt,
    });

    if (!validationResult.success) {
      const validationErrors: ValidationErrors = {};

      validationResult.error.errors.forEach((err) => {
        const fieldName = err.path[0];
        validationErrors[fieldName] = err.message;
      });

      return {
        message: "Validation error",
        validationErrors,
      };
    }

    const validatedData = validationResult.data;

    const materialOrder = await prisma.materialOrder.update({
      where: {
        id,
      },
      data: {
        materialId: validatedData.materialId,
        quantity: validatedData.quantity,
        completedAt: validatedData.completedAt
          ? new Date(validatedData.completedAt)
          : null,
      },
    });

    return {
      data: materialOrder,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteMaterialOrder(
  id: string,
  state: TAction<TMaterialOrder>,
): Promise<TAction<TMaterialOrder>> {
  try {
    const materialOrder = await prisma.materialOrder.delete({
      where: { id },
    });

    return {
      data: materialOrder,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getMaterialOrders(
  take?: number,
  skip?: number,
  query?: string,
): Promise<TAction<[TMaterialOrder[], number]>> {
  try {
    const decodedQuery = query ? decodeURIComponent(query) : undefined;

    const [materialOrders, total] = await prisma.$transaction([
      prisma.materialOrder.findMany({
        include: {
          material: true,
        },
        where: {
          material: {
            name: {
              contains: decodedQuery,
              mode: "insensitive",
            },
          },
        },
        take,
        skip,
      }),
      prisma.materialOrder.count({
        where: {
          material: {
            name: {
              contains: decodedQuery,
              mode: "insensitive",
            },
          },
        },
      }),
    ]);

    return {
      data: [materialOrders, total],
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
