-- DropForeignKey
ALTER TABLE `Prospect` DROP FOREIGN KEY `Prospect_assigned_to_id_fkey`;

-- AlterTable
ALTER TABLE `Prospect` MODIFY `assigned_to_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Prospect` ADD CONSTRAINT `Prospect_assigned_to_id_fkey` FOREIGN KEY (`assigned_to_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
