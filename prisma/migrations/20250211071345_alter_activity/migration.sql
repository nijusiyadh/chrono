-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "statusLogsId" INTEGER;

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_statusLogsId_fkey" FOREIGN KEY ("statusLogsId") REFERENCES "status_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
