import { updateEvent } from '@/actions/events'
import { QUERY_KEYS } from '@/constants/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { id: number; description: string }) => {
      const newEvent = await updateEvent(data)
      return newEvent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.events]
      })
    }
  })
}
