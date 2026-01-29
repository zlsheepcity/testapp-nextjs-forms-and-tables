'use client';

import { useActionState, useEffect, FC, ReactNode } from 'react';
import { submitRegistration } from './actions';
import { SideLoading as Loading } from '@/components/SideLoading';
import { Oops } from '@/components/ui/ValidationError';

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
    <form action={formAction} noValidate={false} className="w-xs max-w-full">

      <fieldset className="flex flex-col my-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder=""
          defaultValue={formState?.values?.name ?? ''}
          className="text-sm p-2 border-2 sm:text-xl"
          />
        {formState?.errors?.name && (<Oops>{formState.errors.name}</Oops>)}
      </fieldset>

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

      <fieldset className="flex flex-col my-4">
        <label htmlFor="repassword">Re-type password</label>
        <input
          type="password"
          name="repassword"
          id="repassword"
          placeholder=""
          defaultValue={formState?.values?.repassword ?? ''}
          className="text-sm p-2 border-2 sm:text-xl"
        />
        {formState?.errors?.repassword && (<Oops>{formState.errors.repassword}</Oops>)}
      </fieldset>

      <fieldset className="flex flex-col my-8">
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            defaultChecked={!!formState?.values?.checkbox}
            />
          <label htmlFor="checkbox">Required checkbox</label>
        </div>
        {formState?.errors?.checkbox && (<Oops>{formState.errors.checkbox}</Oops>)}
      </fieldset>

      <div className="my-8">
        <button
          type="submit"
          disabled={formPending}
          className="block p-2 rounded-md text-xl border-2 border-cyan-900 bg-cyan-900 hover:bg-cyan-800"
          children={'Submit'}
          />      
      </div>

      <Loading isLoading={formPending} />

    </form>
  );

};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default FormRegistration;
