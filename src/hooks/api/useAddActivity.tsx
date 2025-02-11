import { addActivity } from '@/actions/activity'
import { QUERY_KEYS } from '@/constants/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddActivity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { name: string }) => {
      const newActivity = await addActivity(data)
      return newActivity
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.activities]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.logs]
      })
    }
  })
}
