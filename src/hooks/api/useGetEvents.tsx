import { getEvents } from '@/actions/events'
import { QUERY_KEYS } from '@/constants/api'
import { Events, Projects } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export type EventResponse = Events & {
  project: Projects
}

export const useGetEvents = (date?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.events],
    queryFn: async () => {
      const events = await getEvents(date)
      return events
    }
  })
}
