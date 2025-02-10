"use server";

import { TProduct } from "@/types/product";
import { TAction } from "@/types/actions";
import { prisma } from "@/utils/prisma";
import { productSchema } from "@/schemas/product";

export async function getProducts(
  take: number,
  skip: number,
): Promise<TAction<[TProduct[], number]>> {
  try {
    const res = await prisma.$transaction([
      prisma.product.findMany({
        take,
        skip,
      }),
      prisma.product.count(),
    ]);

    return {
      data: res as [TProduct[], number],
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function createProduct(
  state: TAction<TProduct>,
  formData: FormData,
): Promise<TAction<TProduct>> {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    const validationResult = productSchema.safeParse({
      name,
      price,
      description,
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

    const res = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
      },
    });

    return {
      data: res as TProduct,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
