import { getProjects } from '@/actions/projects'
import { QUERY_KEYS } from '@/constants/api'
import { useQuery } from '@tanstack/react-query'

export const useGetProjects = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.projects],
    queryFn: async () => {
      const projects = await getProjects()
      return projects
    }
  })
}
