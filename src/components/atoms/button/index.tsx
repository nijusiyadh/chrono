'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disable?: boolean;
}

export const Button = ({
  children,
  disable = false,
  type,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disable}
      type={type}
      onClick={onClick}
      className={clsx(
        'flex w-full items-center justify-center rounded bg-bg-secondary p-2',
        className,
      )}>
      {children}
    </button>
  );
};
