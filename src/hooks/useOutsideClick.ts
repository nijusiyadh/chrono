import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  callback: () => void,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        callback();
      }
    };

    window.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('click', handleClick, true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};
