/*
  Warnings:

  - Added the required column `user_id` to the `Days_off` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Days_off` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Days_off` ADD CONSTRAINT `Days_off_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
