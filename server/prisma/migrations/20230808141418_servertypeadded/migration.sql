/*
  Warnings:

  - Added the required column `server_type_id` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Server` ADD COLUMN `bdd_host_name` VARCHAR(255) NULL,
    ADD COLUMN `ipv4` VARCHAR(255) NULL,
    ADD COLUMN `ipv6` VARCHAR(255) NULL,
    ADD COLUMN `server_type_id` INTEGER NOT NULL,
    ADD COLUMN `ssh` VARCHAR(255) NULL,
    ADD COLUMN `stfp` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `Server_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `is_archived` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Server` ADD CONSTRAINT `Server_server_type_id_fkey` FOREIGN KEY (`server_type_id`) REFERENCES `Server_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
