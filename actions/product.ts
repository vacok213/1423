"use server";

import { TProduct } from "@/types/product";
import { TAction } from "@/types/actions";
import { prisma } from "@/utils/prisma";
import { productSchema } from "@/schemas/product";
import { ValidationErrors } from "@react-types/shared";

export async function getProduct(id: string): Promise<TAction<TProduct>> {
  try {
    const res = await prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return {
      data: res as TProduct,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

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
    };
  } catch (error) {
    return {
      message:
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

    const res = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
      },
    });

    return {
      data: res as TProduct,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function updateProduct(
  id: string,
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

    const res = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
      },
    });

    return {
      data: res as TProduct,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteProduct(id: string): Promise<TAction<TProduct>> {
  try {
    const product = await prisma.product.delete({
      where: { id },
    });

    return {
      data: product as TProduct,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
