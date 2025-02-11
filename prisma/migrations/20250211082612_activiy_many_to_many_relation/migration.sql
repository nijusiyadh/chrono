/*
  Warnings:

  - You are about to drop the column `statusLogsId` on the `activities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_statusLogsId_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "statusLogsId";

-- CreateTable
CREATE TABLE "ActivitiesOnLogs" (
    "statusLogId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "ActivitiesOnLogs_pkey" PRIMARY KEY ("statusLogId","activityId")
);

-- AddForeignKey
ALTER TABLE "ActivitiesOnLogs" ADD CONSTRAINT "ActivitiesOnLogs_statusLogId_fkey" FOREIGN KEY ("statusLogId") REFERENCES "status_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitiesOnLogs" ADD CONSTRAINT "ActivitiesOnLogs_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
