import { updateEventProject } from '@/actions/events'
import { QUERY_KEYS } from '@/constants/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateEventProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { id: number; projectId: number }) => {
      return await updateEventProject({
        id: data.id,
        projectId: data.projectId
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.events]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.projects]
      })
    }
  })
}
