'use client';

import {
  BellIcon,
  BellYellowIcon,
  ClockIcon,
  ClockYellowIcon,
} from '@/assets/images';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

type SelectionOptionType = 'start-end' | 'pomerado';

type TimePeriodsType = '15' | '30' | '45' | '60' | '90' | '120';
const timePeriods: TimePeriodsType[] = ['15', '30', '45', '60', '90', '120'];

export const TimerOptionSelector = () => {
  const [selectedOption, setSelectedOption] =
    useState<SelectionOptionType>('start-end');
  const [selectedTime, setSelectedTime] = useState<TimePeriodsType>('15');

  const renderOptionButton = (
    type: SelectionOptionType,
    selected: SelectionOptionType,
    disabled: boolean,
  ) => {
    let ButtonIcon;

    if (type === 'start-end') {
      ButtonIcon = selected === 'start-end' ? ClockYellowIcon : ClockIcon;
    } else {
      ButtonIcon = selected === 'pomerado' ? BellYellowIcon : BellIcon;
    }

    return (
      <button
        disabled={disabled}
        onClick={() => setSelectedOption(type)}
        className={clsx(
          'flex items-center justify-center gap-2',
          {
            'text-text-yellow': selected === type,
          },
          {
            'text-text-faded': selected !== type,
          },
        )}>
        <Image src={ButtonIcon} width={24} height={24} alt='clock icon' />
        <span className='text-base'>
          {type === 'start-end' ? 'start/end' : 'pomerado'}
        </span>
      </button>
    );
  };

  return (
    <div className='flex w-full max-w-195 items-center justify-center gap-6 rounded-lg bg-bg-secondary px-8 py-2'>
      <div className='flex gap-6'>
        {renderOptionButton('start-end', selectedOption, false)}
        {renderOptionButton('pomerado', selectedOption, true)}
      </div>
      <div className='flex items-center justify-center gap-6 px-8 py-2'>
        {timePeriods.map((time) => (
          <button
            onClick={() => setSelectedTime(time)}
            disabled={selectedOption === 'start-end'}
            className={clsx('text-base text-text-faded', {
              'text-text-yellow':
                selectedOption !== 'start-end' && selectedTime === time,
            })}
            key={time}>
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};
