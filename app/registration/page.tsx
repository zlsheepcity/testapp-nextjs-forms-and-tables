'use client';

import { useState, FC } from 'react';
import { FormRegistration, IFormRegistration } from './form';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page

export const PageRegistration:FC = () => {
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">

        <h1>Registration form</h1>

        {!success && (
          <FormRegistration onSuccess={()=>setSuccess(true)} />
        )}

        {success && (
          <article>
            <h2>
              Registration confirmed!
            </h2>
            <a href="/login">
              Continue to login
            </a>
          </article>
        )}

      </main>
    </div>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default PageRegistration;
