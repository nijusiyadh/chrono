'use client';

import clsx from 'clsx';
import React from 'react';

interface ProjectButtonProps {
  variant?: 'primary' | 'secondary';
  buttonText: string;
  className?: string;
  onClick: () => void;
}

export const ProjectButton = ({
  variant = 'primary',
  buttonText,
  className,
  onClick,
}: ProjectButtonProps) => {
  const style = clsx(
    'w-full py-1 px-3 rounded-lg text-base text-center',
    { 'bg-text-yellow text-bg-secondary': variant === 'primary' },
    { 'bg-bg-primary text-text-green': variant === 'secondary' },
    className,
  );

  return (
    <button onClick={onClick} className={style}>
      {buttonText}
    </button>
  );
};
