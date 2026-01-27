'use client';

import { useState, FC } from 'react';
import { FormLogin, IFormLogin } from './form';
import { SectionOTPForm, ISectionOTPForm } from './otp';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page

export const PageLogin:FC = () => {
  const [successLogin, setSuccessLogin] = useState(false);
  const [successOTP, setSuccessOTP] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">

        <h1>Login form</h1>

        {!successLogin && (
          <FormLogin onSuccess={()=>setSuccessLogin(true)} />
        )}

        {successLogin && !successOTP && (
          <SectionOTPForm onSuccess={()=>setSuccessOTP(true)} />
        )}

        {successOTP && (
          <div>
            <h3 className="text-3xl font-semibold">
              Awesome! OTP success!
            </h3>
            <div className="flex gap-2 my-2 justify-center">
              <a 
                className="
                  flex h-12 size-max items-center justify-center gap-2 rounded-full px-5
                  bg-foreground text-background transition-colors
                  hover:bg-[#383838] dark:hover:bg-[#ccc]
                  "
                href="/datatable"
                >
                Continue
                </a>
              <button 
                className="
                  flex h-12 size-max items-center justify-center gap-2 rounded-full px-5
                  border border-solid border-black/[.08]
                  transition-colors
                  hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]
                  "
                onClick={e => {
                  setSuccessLogin(true);
                  setSuccessOTP(false);
                }}
                >
                Try again
                </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default PageLogin;
