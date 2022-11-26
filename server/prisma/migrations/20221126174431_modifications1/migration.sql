/*
  Warnings:

  - Made the column `company_name` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postal_code` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contacted_at` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estimate_budget` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `need_description` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_website` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `website_year` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_client` on table `Prospect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Prospect_status` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Prospect_status` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order_number` on table `Prospect_status` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_archived` on table `Prospect_status` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Prospect` MODIFY `company_name` VARCHAR(255) NOT NULL,
    MODIFY `address` VARCHAR(255) NOT NULL,
    MODIFY `postal_code` VARCHAR(6) NOT NULL,
    MODIFY `city` VARCHAR(255) NOT NULL,
    MODIFY `country` VARCHAR(255) NOT NULL,
    MODIFY `contacted_at` DATETIME(0) NOT NULL,
    MODIFY `estimate_budget` INTEGER NOT NULL,
    MODIFY `need_description` TEXT NOT NULL,
    MODIFY `has_website` BOOLEAN NOT NULL,
    MODIFY `website_year` INTEGER NOT NULL,
    MODIFY `is_client` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Prospect_status` MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `color` VARCHAR(7) NOT NULL,
    MODIFY `order_number` INTEGER NOT NULL,
    MODIFY `is_archived` BOOLEAN NOT NULL;
