"use server";

import { TProductMaterial } from "@/types/productMaterial";
import { TAction } from "@/types/actions";
import { prisma } from "@/utils/prisma";
import { ValidationErrors } from "@react-types/shared";
import { productMaterialSchema } from "@/schemas/productMaterial";

export async function getProductMaterials(
  take: number,
  skip: number,
): Promise<TAction<[TProductMaterial[], number]>> {
  try {
    const res = await prisma.$transaction([
      prisma.productMaterial.findMany({
        take,
        skip,
        include: {
          product: true,
          material: true,
        },
      }),
      prisma.productMaterial.count(),
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

export async function getProductMaterial(
  id: string,
): Promise<TAction<TProductMaterial>> {
  try {
    const material = await prisma.productMaterial.findUniqueOrThrow({
      where: { id },
      include: {
        product: true,
        material: true,
      },
    });
    return { data: material };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function createProductMaterial(
  state: TAction<TProductMaterial>,
  formData: FormData,
): Promise<TAction<TProductMaterial>> {
  try {
    const productId = formData.get("productId") as string;
    const materialId = formData.get("materialId") as string;
    const quantity = parseFloat(formData.get("quantity") as string);

    const validationResult = productMaterialSchema.safeParse({
      productId,
      materialId,
      quantity,
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

    const material = await prisma.productMaterial.create({
      data: {
        productId: validatedData.productId,
        materialId: validatedData.materialId,
        quantity: validatedData.quantity,
      },
    });

    return { data: material };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function updateProductMaterial(
  id: string,
  state: TAction<TProductMaterial>,
  formData: FormData,
): Promise<TAction<TProductMaterial>> {
  try {
    const productId = formData.get("productId") as string;
    const materialId = formData.get("materialId") as string;
    const quantity = parseFloat(formData.get("quantity") as string);

    const validationResult = productMaterialSchema.safeParse({
      productId,
      materialId,
      quantity,
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

    const material = await prisma.productMaterial.update({
      where: { id },
      data: {
        productId: validatedData.productId,
        materialId: validatedData.materialId,
        quantity: validatedData.quantity,
      },
    });

    return { data: material };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteProductMaterial(
  id: string,
): Promise<TAction<TProductMaterial>> {
  try {
    const material = await prisma.productMaterial.delete({ where: { id } });
    return { data: material };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
