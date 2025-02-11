import { getLogs } from '@/actions/logs'
import { QUERY_KEYS } from '@/constants/api'
import { useQuery } from '@tanstack/react-query'

export const useGetDailyLogs = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.logs],
    queryFn: async () => {
      const logs = await getLogs()
      return logs
    }
  })
}
