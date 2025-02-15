"use server";

import { productionOrderSchema } from "@/schemas/productionOrder";
import { TAction } from "@/types/actions";
import { TProductionOrder } from "@/types/productionOrder";
import { prisma } from "@/utils/prisma";
import { ValidationErrors } from "@react-types/shared";
import { getRequiredMaterialsForProduction } from "./product";
import { TInsufficientMaterials } from "@/types/insufficientMaterial";
import { TMaterialOrder } from "@/types/materialOrder";

export async function getProductionOrder(
  id: string,
): Promise<TAction<TProductionOrder>> {
  try {
    const productionOrder = await prisma.productionOrder.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        product: true,
        status: true,
      },
    });

    return {
      data: productionOrder,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function createProductionOrder(
  state: TAction<[TInsufficientMaterials[], TProductionOrder?]>,
  formData: FormData,
): Promise<TAction<[TInsufficientMaterials[], TProductionOrder?]>> {
  try {
    const productId = formData.get("productId") as string;
    const quantity = parseFloat(formData.get("quantity") as string);
    const statusId = formData.get("statusId") as string;

    const validationResult = productionOrderSchema.safeParse({
      productId,
      quantity,
      statusId,
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

    const { data, message: materialsMessage } =
      await getRequiredMaterialsForProduction(
        validatedData.productId,
        validatedData.quantity,
      );

    if (!data || materialsMessage) {
      return {
        message: materialsMessage,
      };
    }

    const insufficientMaterials = data.insufficientMaterials;

    if (insufficientMaterials.length > 0) {
      return {
        data: [insufficientMaterials],
        message: "Not enough materials",
      };
    }

    const productionOrder = await prisma.productionOrder.create({
      data: {
        productId: validatedData.productId,
        quantity: validatedData.quantity,
        statusId: validatedData.statusId,
      },
    });

    return {
      data: [insufficientMaterials, productionOrder],
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function updateProductionOrder(
  id: string,
  state: TAction<TProductionOrder>,
  formData: FormData,
): Promise<TAction<TProductionOrder>> {
  try {
    const productId = formData.get("productId") as string;
    const quantity = parseFloat(formData.get("quantity") as string);
    const statusId = formData.get("statusId") as string;

    const validationResult = productionOrderSchema.safeParse({
      productId,
      quantity,
      statusId,
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

    const product = await prisma.productionOrder.update({
      where: {
        id,
      },
      data: {
        productId: validatedData.productId,
        quantity: validatedData.quantity,
        statusId: validatedData.statusId,
      },
    });

    return {
      data: product,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getProductionOrders(
  take?: number,
  skip?: number,
  productId?: string,
  statusId?: string,
): Promise<TAction<[TProductionOrder[], number]>> {
  try {
    const decodedProductId = productId
      ? decodeURIComponent(productId)
      : undefined;
    const decodedStatusId = statusId ? decodeURIComponent(statusId) : undefined;

    const res = await prisma.$transaction([
      prisma.productionOrder.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  productId: {
                    contains: decodedProductId,
                    mode: "insensitive",
                  },
                  statusId: {
                    contains: decodedStatusId,
                    mode: "insensitive",
                  },
                },
              ],
            },
          ],
        },
        include: {
          product: true,
          status: true,
        },
        take,
        skip,
      }),
      prisma.productionOrder.count({
        where: {
          AND: [
            {
              OR: [
                {
                  productId: {
                    contains: decodedProductId,
                    mode: "insensitive",
                  },
                  statusId: {
                    contains: decodedStatusId,
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
      data: res,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteProductionOrder(
  id: string,
): Promise<TAction<TProductionOrder>> {
  try {
    const productionOrder = await prisma.productionOrder.delete({
      where: { id },
    });

    return {
      data: productionOrder,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getProductionOrdersCountInRange(
  startDate: Date,
  endDate: Date,
): Promise<TAction<number>> {
  try {
    const count = await prisma.productionOrder.count({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    return {
      data: count,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
