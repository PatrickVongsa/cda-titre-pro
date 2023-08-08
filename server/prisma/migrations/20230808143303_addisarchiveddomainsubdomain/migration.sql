/*
  Warnings:

  - Added the required column `is_archived` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_archived` to the `Subdomain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Domain` ADD COLUMN `is_archived` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Subdomain` ADD COLUMN `is_archived` BOOLEAN NOT NULL;
