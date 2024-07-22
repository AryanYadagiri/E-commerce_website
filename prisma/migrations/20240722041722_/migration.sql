/*
  Warnings:

  - The primary key for the `SellerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerProfileId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "sellerProfileId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SellerProfile" DROP CONSTRAINT "SellerProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SellerProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SellerProfile_id_seq";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES "SellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
