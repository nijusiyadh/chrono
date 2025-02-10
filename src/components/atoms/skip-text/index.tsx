import React from 'react';

export const SkipText = () => {
  return (
    <div className='text-bg-gray flex w-full items-center justify-center gap-3 text-sm'>
      <span className='bg-bg-gray p-1 leading-[18px] text-gray-700'>alt</span>
      <span>+</span>
      <span className='bg-bg-gray p-1 leading-[18px] text-gray-700'>space</span>
      <span>-</span>
      <span>skip login</span>
    </div>
  );
};
