/*
  Warnings:

  - The primary key for the `SellerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `sellerProfileId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sellerProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellerProfile" DROP CONSTRAINT "SellerProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SellerProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SellerProfile_id_seq";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES "SellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
