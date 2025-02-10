'use client';

import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NavArrowButtonProps {
  direction?: 'left' | 'right';
  onClick: () => void;
}

export const NavArrowButton = ({
  direction = 'left',
  onClick,
}: NavArrowButtonProps) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className='rounded bg-bg-secondary p-2 text-text-white'>
      {direction === 'left' ? (
        <IoIosArrowBack size={24} />
      ) : (
        <IoIosArrowForward size={24} />
      )}
    </button>
  );
};
