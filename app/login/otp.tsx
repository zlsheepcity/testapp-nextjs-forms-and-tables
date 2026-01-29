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

    </section>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default SectionOTPForm;
