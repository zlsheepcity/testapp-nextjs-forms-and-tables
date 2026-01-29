'use client';

import { useState, useEffect } from 'react';
import { SideLoading as Loading } from '@/components/SideLoading';
import { OTPForm } from "@/components/OTPForm";
import {
  MockFetchOTPConfirm as FetchOTPConfirm,
  IResponceOTPConfirm,
} from './actions';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Section

export interface ISectionOTPFormProps {
  onSuccess: () => void;
}

export const SectionOTPForm = ({onSuccess}: ISectionOTPFormProps) => {
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitCode = async (code: string) => {
    setLoading(true);
    const responce: IResponceOTPConfirm = await FetchOTPConfirm(code);
    setSuccess(responce?.success || false);
    setAttempt(attempt + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (success) onSuccess();
  }, [success])

  return (
    <section id="SectionOTPForm">

      <Loading isLoading={loading} />

      <OTPForm
        key={attempt}
        mask='****'
        submit={submitCode}
        />

      {!loading && !success && attempt>0 && (
        <div>
          Wrong code! Please try again.
        </div>
      )}

      <section className="pt-32 pb-8">
        <h2 className="text-2xl font-semibold leading-10 tracking-tight">
          Copy-paste features
        </h2>
        <ul>
          <li>0000 (incorrect)</li>
          <li>5446 (will pass)</li>
        </ul>
      </section>

    </section>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default SectionOTPForm;
