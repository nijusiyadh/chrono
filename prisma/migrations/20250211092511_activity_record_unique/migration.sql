/*
  Warnings:

  - A unique constraint covering the columns `[logId,activityId]` on the table `activity_records` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "activity_records_logId_activityId_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "activity_records_logId_activityId_key" ON "activity_records"("logId", "activityId");
