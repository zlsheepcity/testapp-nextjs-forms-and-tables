'use client';

import { useActionState, useState, useEffect, FC } from 'react';
import { submitLogin } from './actions';
import { SideLoading as Loading } from '@/components/SideLoading';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Form

export interface IFormLogin {
  onSuccess: () => void;
}

export const FormLogin:FC<IFormLogin> = ({onSuccess}) => {
  const [formState, formAction, formPending] = useActionState(submitLogin, null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (formState?.success) setSuccess(true);
  }, [formState])

  useEffect(() => {
    if (success) onSuccess();
  }, [success])

  return (
    <form action={formAction} noValidate={false} className="w-xs max-w-full">

      <fieldset className="flex flex-col my-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder=""
          defaultValue={formState?.values?.email ?? ''}
          className="text-sm p-2 border-2 sm:text-xl"
          />
        {formState?.errors?.email && (<Oops>{formState.errors.email}</Oops>)}
      </fieldset>

      <fieldset className="flex flex-col my-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder=""
          defaultValue={formState?.values?.password ?? ''}
          className="text-sm p-2 border-2 sm:text-xl"
          />
        {formState?.errors?.password && (<Oops>{formState.errors.password}</Oops>)}
      </fieldset>

      <div className="flex gap-4 my-8">
        <button
          type="submit"
          disabled={formPending}
          className="block p-2 rounded-md text-xl border-2 border-cyan-900 bg-cyan-900 hover:bg-cyan-800"
          children={'Submit'}
          />
        <button
          type="button"
          disabled={formPending}
          onClick={()=>setSuccess(true)}
          className="block p-2 rounded-md text-xl border-2 border-cyan-900 hover:bg-slate-800"
          children={'Skip to OTP'}
          />
      </div>


      <Loading isLoading={formPending} />

      <section className="py-8">
        <h2 className="text-2xl font-semibold leading-10 tracking-tight">
          Copy-paste features
        </h2>
        <ul>
          <li>incorrect@email.com</li>
          <li>incorrect-password</li>
        </ul>
      </section>

    </form>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Helpers

 const Oops = ({children}: {children: ReactNode}) => {
  return (
    <p aria-live="polite" className="p-1 border-t-0">
      <span className="inline-block w-2 h-2 mr-2 rounded-full align-middle bg-pink-600" />
      {children}
    </p>
  );
 };

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default FormLogin;
