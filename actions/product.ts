"use server";

import { TProduct } from "@/types/product";
import { TAction } from "@/types/actions";
import { prisma } from "@/utils/prisma";
import { productSchema } from "@/schemas/product";
import { ValidationErrors } from "@react-types/shared";
import { TMaterial } from "@/types/material";
import { TInsufficientMaterials } from "@/types/insufficientMaterial";

export async function getProduct(id: string): Promise<TAction<TProduct>> {
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id,
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

export async function getRequiredMaterialsForProduction(
  productId: string,
  quantity: number,
): Promise<
  TAction<{
    insufficientMaterials: TInsufficientMaterials[];
  }>
> {
  try {
    const productWithMaterials = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        materials: {
          include: {
            material: true,
          },
        },
      },
    });

    if (!productWithMaterials) {
      return {
        message: "Product not found",
      };
    }

    const insufficientMaterials: {
      material: TMaterial;
      required: number;
    }[] = [];

    for (const pm of productWithMaterials.materials) {
      const requiredQuantity = pm.quantity * quantity;

      if (requiredQuantity > pm.material.quantityInStock) {
        insufficientMaterials.push({
          material: pm.material,
          required: requiredQuantity,
        });
      }
    }

    return {
      data: {
        insufficientMaterials,
      },
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getProducts(
  take?: number,
  skip?: number,
  query?: string,
): Promise<TAction<[TProduct[], number]>> {
  try {
    const decodedQuery = query ? decodeURIComponent(query) : undefined;

    const res = await prisma.$transaction([
      prisma.product.findMany({
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
                {
                  description: {
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
      prisma.product.count({
        where: {
          AND: [
            {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: query,
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

    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
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

    const product = await prisma.product.update({
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
      data: product,
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
      data: product,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getCostEstimateProduct(
  id: string,
): Promise<TAction<number>> {
  try {
    const productMaterials = await prisma.productMaterial.findMany({
      where: {
        productId: id,
      },
      include: {
        material: true,
      },
    });

    let costEstimateProduct = 0;

    productMaterials.forEach((productMaterial) => {
      costEstimateProduct +=
        productMaterial.material.cost * productMaterial.quantity;
    });

    return {
      data: costEstimateProduct,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
