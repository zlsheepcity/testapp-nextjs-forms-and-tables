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
    <form action={formAction} noValidate={false}>

      <fieldset className="flex flex-col my-2">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="" defaultValue={formState?.values?.email ?? ''}  className="border-1" />
        {formState?.errors?.email && <p aria-live="polite">{formState.errors.email}</p>}
      </fieldset>

      <fieldset className="flex flex-col my-2">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="" defaultValue={formState?.values?.password ?? ''}  className="border-1" />
        {formState?.errors?.password && <p aria-live="polite">{formState.errors.password}</p>}
      </fieldset>

      <button type="submit" disabled={formPending} className="border-1 p-2">
        Submit
      </button>
      <button type="button" disabled={formPending} className="border-1 p-2" onClick={()=>setSuccess(true)}>
        Skip to OTP
      </button>

      <Loading isLoading={formPending} />

      <section>
        <h2>Copy-paste features</h2>
        <ul>
          <li>incorrect@email.com</li>
          <li>incorrect-password</li>
        </ul>
      </section>

    </form>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default FormLogin;
