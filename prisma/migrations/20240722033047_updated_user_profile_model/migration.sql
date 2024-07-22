/*
  Warnings:

  - The primary key for the `SellerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SellerProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `sellerProfileId` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerProfileId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sellerProfileId",
ADD COLUMN     "sellerProfileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SellerProfile" DROP CONSTRAINT "SellerProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SellerProfile_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES "SellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
