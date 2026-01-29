import { ReactNode } from 'react';

/**
 * ValidationError|Oops
 * just a shortcut for validation error messages
 * */

export const Oops = ({
  children,
  isError = true,
}: {
  children: ReactNode,
  isError?: boolean,
}) => {
  const bulletClassName = isError
    ? 'inline-block w-2 h-2 mr-2 rounded-full align-middle bg-pink-600'
    : 'inline-block w-2 h-2 mr-2 rounded-full align-middle bg-sky-600'
    ;
  return (
    <p aria-live="polite" className="p-1">
      <span className={bulletClassName} />
      {children}
    </p>
  );
};

export default Oops;
