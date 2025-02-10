import { addEvent } from '@/actions/events'
import { QUERY_KEYS } from '@/constants/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: {
      projectId: number
      startTime: string
      endTime: string
      duration: number
    }) => {
      const newEvent = await addEvent(data)
      return newEvent
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.events]
      })
    }
  })
}
