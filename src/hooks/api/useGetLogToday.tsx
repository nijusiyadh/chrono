import { getTodayLogs } from '@/actions/logs'
import { QUERY_KEYS } from '@/constants/api'
import { useQuery } from '@tanstack/react-query'

export const useGetLog = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.logs],
    queryFn: async () => {
      const logs = await getTodayLogs()
      return logs
    }
  })
}
