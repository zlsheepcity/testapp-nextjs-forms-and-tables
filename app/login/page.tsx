'use client';

import { useState, FC } from 'react';
import { FormLogin, IFormLogin } from './form';
import { SectionOTPForm, ISectionOTPFormProps } from './otp';
import { AsideNote, AsideNoteOTP } from './note';


// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page

export const PageLogin:FC = () => {
  const [successLogin, setSuccessLogin] = useState(false);
  const [successOTP, setSuccessOTP] = useState(false);

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
            Login
          </h1>
        </header>

        {!successLogin && (
          <FormLogin onSuccess={()=>setSuccessLogin(true)} />
        )}

        {successLogin && !successOTP && (
          <SectionOTPForm onSuccess={()=>setSuccessOTP(true)} />
        )}

        {successOTP && (
          <article>
            <h2 className="text-3xl font-semibold leading-10 tracking-tight">
              Awesome! OTP success!
            </h2>
            <div className="flex gap-4 my-8">
              <a href="/datatable" className="block p-2 rounded-md text-xl border-2 border-cyan-900 bg-cyan-900 hover:bg-cyan-800">
                Continue
              </a>
              <button
                className="block p-2 rounded-md text-xl border-2 border-cyan-900 hover:bg-slate-800"
                onClick={e => {
                  setSuccessLogin(true);
                  setSuccessOTP(false);
                }}
                >
                Try again
              </button>
            </div>
          </article>
        )}

      </main>

      {!successLogin && (<AsideNote />)}
      {successLogin && (<AsideNoteOTP />)}

    </div>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default PageLogin;
