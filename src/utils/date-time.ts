import { intervalToDuration } from 'date-fns'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export const toUTCFormat = (value: Value): string => {
  if (value instanceof Date) {
    return value.toISOString()
  } else if (Array.isArray(value)) {
    const start = value[0] instanceof Date ? value[0].toISOString() : 'null'
    const end = value[1] instanceof Date ? value[1].toISOString() : 'null'
    return `Start: ${start}, End: ${end}`
  }
  return 'No date selected'
}

export const formatTimeDuration = (seconds: number): string => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 }) // Convert seconds to milliseconds

  const hours = String(duration.hours ?? 0).padStart(2, '0')
  const minutes = String(duration.minutes ?? 0).padStart(2, '0')
  const secs = String(duration.seconds ?? 0).padStart(2, '0')

  return `${hours}:${minutes}:${secs}`
}

export const formatTotalDuration = (seconds: number): string => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })

  const hours = duration.hours ? `${duration.hours}hr` : ''
  const minutes = duration.minutes ? `${duration.minutes}m` : ''
  const secs = duration.seconds ? `${duration.seconds}s` : ''

  return [hours, minutes, secs].filter(Boolean).join(' ')
}

export const getDurationParts = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return { hours, minutes, seconds: secs }
}
