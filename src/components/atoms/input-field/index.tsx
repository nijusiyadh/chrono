'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  showPasswordHider?: boolean;
}

const InputField = ({
  className,
  showPasswordHider = false,
  ...props
}: InputFieldProps) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className='relative'>
      <input
        type={showPasswordHider ? (hidden ? 'password' : 'text') : 'text'}
        {...props}
        className={clsx(
          'rounded bg-bg-secondary p-2 text-base text-text-white placeholder:text-text-faded focus:outline focus:outline-white',
          className,
        )}
      />
      {showPasswordHider && (
        <button
          type='button'
          onClick={() => setHidden((prev) => !prev)}
          className='absolute right-4 top-1/2 -translate-y-1/2'>
          {hidden ? (
            <FaEye size={16} className='text-gray-400' />
          ) : (
            <FaEyeSlash size={16} className='text-gray-400' />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
