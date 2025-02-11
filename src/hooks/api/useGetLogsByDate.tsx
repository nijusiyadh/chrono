import { getLogsByDates } from '@/actions/logs'
import { useMutation } from '@tanstack/react-query'

export const useGetLogsByDate = () => {
  return useMutation({
    mutationFn: async (data: { startDate: string; endDate: string }) => {
      return await getLogsByDates(data.startDate, data.endDate)
    }
  })
}
