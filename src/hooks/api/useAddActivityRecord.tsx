import { addActivityRecord } from '@/actions/activity'
import { QUERY_KEYS } from '@/constants/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddActivityRecord = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: {
      activityId: number
      logId: number
      value: string
    }) => {
      return await addActivityRecord(data.activityId, data.logId, data.value)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.logs]
      })
    }
  })
}
