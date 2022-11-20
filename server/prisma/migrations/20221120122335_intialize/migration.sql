-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `is_archived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Catalog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `description` TEXT NOT NULL,
    `price_ht` DOUBLE NOT NULL,
    `is_archived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(255) NULL,
    `postal_code` VARCHAR(6) NULL,
    `city` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `phone` VARCHAR(10) NULL,
    `email` VARCHAR(255) NULL,
    `siret` VARCHAR(14) NULL,
    `tva_number` VARCHAR(14) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(155) NULL,
    `lastname` VARCHAR(155) NULL,
    `occupation` VARCHAR(255) NULL,
    `phone` VARCHAR(10) NULL,
    `email` VARCHAR(255) NULL,
    `is_prefered_contact` BOOLEAN NULL DEFAULT false,
    `piste_id` INTEGER NOT NULL,
    `is_archived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Days_off` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `days_off_status_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Days_off_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emergency_contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `who_is` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emergency_user` (
    `user_id` INTEGER NOT NULL,
    `emergency_contact_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `emergency_contact_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estimation_cost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `tva_id` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `is_archived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estimation_cost_catalog` (
    `estimation_cost_id` INTEGER NOT NULL,
    `catalog_id` INTEGER NOT NULL,
    `price_applied` DOUBLE NOT NULL,

    PRIMARY KEY (`estimation_cost_id`, `catalog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `report` TEXT NOT NULL,
    `reported_by_id` INTEGER NOT NULL,
    `reported_at` DATETIME(0) NOT NULL,
    `piste_id` INTEGER NOT NULL,
    `modified_by_id` INTEGER NOT NULL,
    `modified_at` DATETIME(0) NOT NULL,
    `is_archived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `tva_id` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `is_archived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice_catalog` (
    `catalog_id` INTEGER NOT NULL,
    `price_applied` DOUBLE NOT NULL,
    `invoice_id` INTEGER NOT NULL,

    PRIMARY KEY (`invoice_id`, `catalog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NULL,
    `description` TEXT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `due_date` DATETIME(0) NOT NULL,
    `project_type_id` INTEGER NOT NULL,
    `project_amount` INTEGER NOT NULL,
    `did_deposit` BOOLEAN NOT NULL,
    `has_financement` BOOLEAN NOT NULL,
    `has_fully_paid` BOOLEAN NOT NULL,
    `project_status_id` INTEGER NOT NULL,
    `link` VARCHAR(255) NULL,
    `github_link` VARCHAR(255) NULL,
    `host` VARCHAR(255) NULL,
    `ora_name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project_user` (
    `user_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prospect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `postal_code` VARCHAR(6) NULL,
    `city` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `phone` VARCHAR(10) NULL,
    `email` VARCHAR(255) NULL,
    `company_logo` VARCHAR(255) NULL,
    `website_url` VARCHAR(255) NULL,
    `facebook_url` VARCHAR(255) NULL,
    `instagram_url` VARCHAR(255) NULL,
    `linkedin_url` VARCHAR(255) NULL,
    `contacted_at` DATETIME(0) NULL,
    `estimate_budget` INTEGER NULL,
    `need_description` TEXT NULL,
    `has_website` BOOLEAN NULL,
    `website_year` INTEGER NULL,
    `other_need` TEXT NULL,
    `is_client` BOOLEAN NULL DEFAULT false,
    `siret_number` VARCHAR(20) NULL,
    `assigned_to_id` INTEGER NOT NULL,
    `piste_status_id` INTEGER NOT NULL,
    `source_id` INTEGER NOT NULL,
    `activity_id` INTEGER NOT NULL,
    `is_archived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prospect_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `color` VARCHAR(7) NULL,
    `order_number` INTEGER NULL,
    `is_archived` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Source` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `is_archived` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `tva_value` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(155) NULL,
    `lastname` VARCHAR(155) NULL,
    `address` VARCHAR(255) NULL,
    `postal_code` VARCHAR(6) NULL,
    `city` VARCHAR(255) NULL,
    `occupation` VARCHAR(255) NOT NULL,
    `contrat_type` VARCHAR(255) NOT NULL,
    `is_archived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_piste_id_fkey` FOREIGN KEY (`piste_id`) REFERENCES `Prospect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Days_off` ADD CONSTRAINT `Days_off_days_off_status_id_fkey` FOREIGN KEY (`days_off_status_id`) REFERENCES `Days_off_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emergency_user` ADD CONSTRAINT `Emergency_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emergency_user` ADD CONSTRAINT `Emergency_user_emergency_contact_id_fkey` FOREIGN KEY (`emergency_contact_id`) REFERENCES `Emergency_contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estimation_cost` ADD CONSTRAINT `Estimation_cost_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Prospect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estimation_cost` ADD CONSTRAINT `Estimation_cost_tva_id_fkey` FOREIGN KEY (`tva_id`) REFERENCES `Tva`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estimation_cost_catalog` ADD CONSTRAINT `Estimation_cost_catalog_estimation_cost_id_fkey` FOREIGN KEY (`estimation_cost_id`) REFERENCES `Estimation_cost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estimation_cost_catalog` ADD CONSTRAINT `Estimation_cost_catalog_catalog_id_fkey` FOREIGN KEY (`catalog_id`) REFERENCES `Catalog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_reported_by_id_fkey` FOREIGN KEY (`reported_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_piste_id_fkey` FOREIGN KEY (`piste_id`) REFERENCES `Prospect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Prospect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_tva_id_fkey` FOREIGN KEY (`tva_id`) REFERENCES `Tva`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice_catalog` ADD CONSTRAINT `Invoice_catalog_catalog_id_fkey` FOREIGN KEY (`catalog_id`) REFERENCES `Catalog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice_catalog` ADD CONSTRAINT `Invoice_catalog_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `Invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_project_type_id_fkey` FOREIGN KEY (`project_type_id`) REFERENCES `Project_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_project_status_id_fkey` FOREIGN KEY (`project_status_id`) REFERENCES `Project_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_user` ADD CONSTRAINT `Project_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_user` ADD CONSTRAINT `Project_user_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prospect` ADD CONSTRAINT `Prospect_assigned_to_id_fkey` FOREIGN KEY (`assigned_to_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prospect` ADD CONSTRAINT `Prospect_piste_status_id_fkey` FOREIGN KEY (`piste_status_id`) REFERENCES `Prospect_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prospect` ADD CONSTRAINT `Prospect_source_id_fkey` FOREIGN KEY (`source_id`) REFERENCES `Source`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prospect` ADD CONSTRAINT `Prospect_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
