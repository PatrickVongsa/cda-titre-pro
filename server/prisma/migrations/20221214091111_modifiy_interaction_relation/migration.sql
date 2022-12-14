-- DropForeignKey
ALTER TABLE `Interaction` DROP FOREIGN KEY `Interaction_modified_by_id_fkey`;

-- AlterTable
ALTER TABLE `Interaction` MODIFY `modified_by_id` INTEGER NULL,
    MODIFY `modified_at` DATETIME(0) NULL;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
