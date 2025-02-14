import { TAction } from "@/types/actions";
import { TStatus } from "@/types/status";
import { prisma } from "@/utils/prisma";

export async function getStatuses(
  take?: number,
  skip?: number,
): Promise<TAction<[TStatus[], number]>> {
  try {
    const res = await prisma.$transaction([
      prisma.status.findMany({
        take,
        skip,
      }),
      prisma.status.count(),
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
