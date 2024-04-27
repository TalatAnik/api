/*
  Warnings:

  - Added the required column `deliveryID` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Deliveryman" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Image" TEXT[] DEFAULT ARRAY['deliverySample.jpg']::TEXT[],

    CONSTRAINT "Deliveryman_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryID_fkey" FOREIGN KEY ("deliveryID") REFERENCES "Deliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
