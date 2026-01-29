'use client';

import { useState, FC } from 'react';
import { FormRegistration, IFormRegistration } from './form';
import { AsideNote } from './note';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page

export const PageRegistration:FC = () => {
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center justify-start font-sans xl:flex-row xl:justify-center xl:items-start">
      <main className="flex w-full max-w-3xl flex-col items-center py-8 px-8 sm:items-start">

        <header className="flex gap-4 mb-8">
          <div className="max-w-xs text-2xl font-semibold leading-10 tracking-tight">
            <a href="/" className="underline decoration-2">
              Home
            </a>
          </div>
          <h1 className="text-3xl font-semibold leading-10 tracking-tight">
            Registration form
          </h1>
        </header>

        <h1></h1>

        {!success && (
          <FormRegistration onSuccess={()=>setSuccess(true)} />
        )}

        {success && (
          <article>
            <h2 className="text-3xl font-semibold leading-10 tracking-tight">
              Registration confirmed!
            </h2>
            <div className="flex gap-4 my-8">
              <a href="/login" className="block p-2 rounded-md text-xl border-2 border-cyan-900 bg-cyan-900 hover:bg-cyan-800">
                Continue to login
              </a>
              <a href="/registration" className="block p-2 rounded-md text-xl border-2 border-cyan-900 hover:bg-slate-800">
                Try again
              </a>
            </div>
          </article>
        )}

      </main>

      <AsideNote />
    </div>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default PageRegistration;
