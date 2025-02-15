-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "quantityInStock" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "MaterialOrder" (
    "id" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "MaterialOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaterialOrder" ADD CONSTRAINT "MaterialOrder_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
