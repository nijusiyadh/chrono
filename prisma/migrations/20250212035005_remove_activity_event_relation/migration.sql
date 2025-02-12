/*
  Warnings:

  - You are about to drop the column `activitiesId` on the `events` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_activitiesId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "activitiesId";
