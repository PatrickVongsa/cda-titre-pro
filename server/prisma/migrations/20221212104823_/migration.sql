/*
  Warnings:

  - Made the column `address` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postal_code` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `siret` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tva_number` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postal_code` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Company` MODIFY `address` VARCHAR(255) NOT NULL,
    MODIFY `postal_code` VARCHAR(6) NOT NULL,
    MODIFY `city` VARCHAR(255) NOT NULL,
    MODIFY `country` VARCHAR(255) NOT NULL,
    MODIFY `phone` VARCHAR(10) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `siret` VARCHAR(14) NOT NULL,
    MODIFY `tva_number` VARCHAR(14) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL,
    MODIFY `firstname` VARCHAR(155) NOT NULL,
    MODIFY `lastname` VARCHAR(155) NOT NULL,
    MODIFY `address` VARCHAR(255) NOT NULL,
    MODIFY `postal_code` VARCHAR(6) NOT NULL,
    MODIFY `city` VARCHAR(255) NOT NULL;
