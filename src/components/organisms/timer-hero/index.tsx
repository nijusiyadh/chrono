'use client';

import React from 'react';
import { ProjectSelector } from '@/components/atoms';
import { Timer } from '@/components/molecules';
import { TimerOptions } from '../timer-options';

export const TimerHero = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-11'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <ProjectSelector />
        <Timer />
      </div>
      <TimerOptions />
    </div>
  );
};
