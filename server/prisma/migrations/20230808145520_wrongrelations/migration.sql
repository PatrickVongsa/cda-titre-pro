/*
  Warnings:

  - You are about to drop the column `subdomain_id` on the `Domain` table. All the data in the column will be lost.
  - Added the required column `domain_id` to the `Subdomain` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Domain` DROP FOREIGN KEY `Domain_subdomain_id_fkey`;

-- AlterTable
ALTER TABLE `Domain` DROP COLUMN `subdomain_id`;

-- AlterTable
ALTER TABLE `Subdomain` ADD COLUMN `domain_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Subdomain` ADD CONSTRAINT `Subdomain_domain_id_fkey` FOREIGN KEY (`domain_id`) REFERENCES `Domain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
