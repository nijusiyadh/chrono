-- AlterTable
ALTER TABLE "events" ADD COLUMN     "activitiesId" INTEGER;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
