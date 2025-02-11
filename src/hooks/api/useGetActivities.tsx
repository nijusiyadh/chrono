import { getActivities } from '@/actions/activity'
import { QUERY_KEYS } from '@/constants/api'
import { useQuery } from '@tanstack/react-query'

export const useGetActivities = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.activities],
    queryFn: async () => {
      const activities = await getActivities()
      return activities
    }
  })
}
