'use client';
/**
 * SideLoading
 * Let it be loading spinner fixed on screen side
 * */

export interface ISideLoading {
  isLoading?: boolean;
}

export const SideLoading:FC = ({isLoading = false}) => {
  return (
    <section className="fixed top-[32%] left-[0]">
      {isLoading && (
        <div className="w-32 h-24 grid place-items-center rounded-r-md bg-cyan-800 text-white">
          <svg className="mr-3 size-8 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-xs font-bold">Please wait...</p>
        </div>
      )}
    </section>
  );
}

export default SideLoading;
