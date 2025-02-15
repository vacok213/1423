"use server";

import { TAction } from "@/types/actions";
import { TStatus } from "@/types/status";
import { prisma } from "@/utils/prisma";
import { statusSchema } from "@/schemas/status";
import { ValidationErrors } from "@react-types/shared";

export async function getStatus(id: string): Promise<TAction<TStatus>> {
  try {
    const status = await prisma.status.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return {
      data: status,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getStatuses(
  take?: number,
  skip?: number,
  query?: string,
): Promise<TAction<[TStatus[], number]>> {
  try {
    const decodedQuery = query ? decodeURIComponent(query) : undefined;

    const res = await prisma.$transaction([
      prisma.status.findMany({
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
      prisma.status.count({
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
      data: res,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function createStatus(
  state: TAction<TStatus>,
  formData: FormData,
): Promise<TAction<TStatus>> {
  try {
    const name = formData.get("name") as string;

    const validationResult = statusSchema.safeParse({
      name,
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

    const status = await prisma.status.create({
      data: {
        name: validatedData.name,
      },
    });

    return {
      data: status,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function updateStatus(
  id: string,
  state: TAction<TStatus>,
  formData: FormData,
): Promise<TAction<TStatus>> {
  try {
    const name = formData.get("name") as string;

    const validationResult = statusSchema.safeParse({
      name,
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

    const status = await prisma.status.update({
      where: {
        id,
      },
      data: {
        name: validatedData.name,
      },
    });

    return {
      data: status,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteStatus(id: string): Promise<TAction<TStatus>> {
  try {
    const status = await prisma.status.delete({
      where: { id },
    });

    return {
      data: status,
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
