'use client';

import { useActionState, useState, useEffect, FC } from 'react';
import { submitLogin } from './actions';
import { SideLoading as Loading } from '@/components/SideLoading';
import { Oops } from '@/components/ui/ValidationError';

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
      
    </form>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default FormLogin;
