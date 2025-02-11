import { getLogs, getLogsByDates } from '@/actions/logs'
import { QUERY_KEYS } from '@/constants/api'
import { useQuery } from '@tanstack/react-query'

export const useGetDailyLogs = ({
  startDate,
  endDate
}: {
  startDate?: string
  endDate?: string
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.logs],
    queryFn: async () => {
      if (startDate && endDate) {
        const logs = await getLogsByDates(startDate, endDate)
        return logs
      } else {
        const logs = await getLogs()
        return logs
      }
    }
  })
}
