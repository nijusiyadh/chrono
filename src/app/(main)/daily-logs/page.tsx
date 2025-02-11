import { LogList } from '@/components/organisms'

function DailyLogs() {
  return (
    <div className='flex flex-col gap-[72px]'>
      <div className='flex flex-col gap-2 text-start'>
        <h1 className='text-[32px] leading-[42px] text-text-yellow'>
          Daily Work Log
        </h1>
        <p className='text-base text-text-faded'>
          Effortlessly log, monitor, and analyze your daily work hours for
          improved productivity and focus.
        </p>
      </div>

      <LogList />
    </div>
  )
}

export default DailyLogs
