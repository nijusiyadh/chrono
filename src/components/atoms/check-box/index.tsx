'use client';

import React from 'react';

interface CheckBoxProps {
  text?: string;
}

export const CheckBox = ({ text }: CheckBoxProps) => {
  return (
    <div className='flex items-center gap-2 bg-transparent'>
      <input
        type='checkbox'
        name='remember'
        defaultChecked={true}
        id='remember'
      />
      {text && (
        <label htmlFor='remember' className='text-text-white'>
          {text}
        </label>
      )}
    </div>
  );
};
