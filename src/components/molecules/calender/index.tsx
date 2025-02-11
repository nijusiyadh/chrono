import Calendar from 'react-calendar'
import './style.css'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

interface CalendarModalProps {
  value: Value
  onChange: (date: Value) => void
}

export const CalendarModal = ({ value, onChange }: CalendarModalProps) => {
  return (
    <div className='w-full max-w-[400px] rounded-lg bg-bg-secondary p-4'>
      <Calendar
        className={'flex flex-col items-center justify-center gap-4'}
        tileClassName={'flex gap-4 items-center justify-center'}
        showNavigation={true}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
