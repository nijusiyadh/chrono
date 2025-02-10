'use client';

import React from 'react';

export const TaskDrawer = () => {
  return (
    <div className='flex h-full w-[400px] flex-col gap-8 bg-bg-secondary p-6'>
      <div className='flex flex-col text-start'>
        <h2 className='text-4xl text-text-yellow'>Add Task</h2>
        <span className='text-lg text-text-faded'>
          Tackle your goals in daily doses
        </span>
      </div>
    </div>
  );
};
