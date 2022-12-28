/*
  Warnings:

  - You are about to drop the column `piste_id` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `piste_id` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the column `piste_status_id` on the `Prospect` table. All the data in the column will be lost.
  - Added the required column `prospect_id` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prospect_id` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prospect_status_id` to the `Prospect` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Contact` DROP FOREIGN KEY `Contact_piste_id_fkey`;

-- DropForeignKey
ALTER TABLE `Interaction` DROP FOREIGN KEY `Interaction_piste_id_fkey`;

-- DropForeignKey
ALTER TABLE `Prospect` DROP FOREIGN KEY `Prospect_piste_status_id_fkey`;

-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `piste_id`,
    ADD COLUMN `prospect_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Interaction` DROP COLUMN `piste_id`,
    ADD COLUMN `prospect_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `prospect_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Prospect` DROP COLUMN `piste_status_id`,
    ADD COLUMN `prospect_status_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_prospect_id_fkey` FOREIGN KEY (`prospect_id`) REFERENCES `Prospect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_prospect_id_fkey` FOREIGN KEY (`prospect_id`) REFERENCES `Prospect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_prospect_id_fkey` FOREIGN KEY (`prospect_id`) REFERENCES `Prospect`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prospect` ADD CONSTRAINT `Prospect_prospect_status_id_fkey` FOREIGN KEY (`prospect_status_id`) REFERENCES `Prospect_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
