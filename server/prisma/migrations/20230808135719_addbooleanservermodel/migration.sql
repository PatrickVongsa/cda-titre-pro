/*
  Warnings:

  - Added the required column `is_archived` to the `Server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_dev` to the `Server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_prod` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Server` ADD COLUMN `is_archived` BOOLEAN NOT NULL,
    ADD COLUMN `is_dev` BOOLEAN NOT NULL,
    ADD COLUMN `is_prod` BOOLEAN NOT NULL;
