'use client';

import { useActionState, useEffect, FC } from 'react';
import { submitRegistration } from './actions';
import { SideLoading } from '@/components/SideLoading';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Form

export interface IFormRegistration {
  onSuccess: () => void;
}

export const FormRegistration:FC<IFormRegistration> = ({onSuccess}) => {
  const [formState, formAction, formPending] = useActionState(submitRegistration, null);

  useEffect(() => {
    if (formState?.success) onSuccess();
  }, [formState])

  return (
    <form action={formAction} noValidate={false}>

      <fieldset className="flex flex-col my-2">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" placeholder="" defaultValue={formState?.values?.name ?? ''}  className="border-1" />
        {formState?.errors?.name && <p aria-live="polite">{formState.errors.name}</p>}
      </fieldset>

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

      <fieldset className="flex flex-col my-2">
        <label htmlFor="repassword">Re-type password</label>
        <input type="password" name="repassword" id="repassword" placeholder="" defaultValue={formState?.values?.repassword ?? ''}  className="border-1" />
        {formState?.errors?.repassword && <p aria-live="polite">{formState.errors.repassword}</p>}
      </fieldset>

      <fieldset className="flex flex-col my-2">
        <div className="flex flex-row gap-2">
          <input type="checkbox" name="checkbox" id="checkbox" defaultChecked={!!formState?.values?.checkbox} className="border-1" />
          <label htmlFor="checkbox">Required checkbox</label>
        </div>
        {formState?.errors?.checkbox && <p aria-live="polite">{formState.errors.checkbox}</p>}
      </fieldset>


      {formState?.success && (
        <p aria-live="polite" className="text-green-700">
          Submitted successfully!
        </p>
      )}

      <button type="submit" disabled={formPending} className="border-1 p-2">
        Submit
      </button>

      <SideLoading isLoading={formPending} />

    </form>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default FormRegistration;
