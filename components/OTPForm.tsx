'use client';

import { useState, useEffect } from 'react';
import { FC, ChangeEvent, KeyboardEvent } from 'react';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Config

const TEXT_LABEL = {
  title: 'Enter OTP code',
};

const STYLE_CLASS = {
  component: '',
  title: 'text-3xl font-semibold',
  fieldset: 'flex gap-2 my-2',
  input: 'w-12 py-1 rounded-sm text-3xl text-center capitalize font-semibold text-white bg-cyan-700 disabled:bg-cyan-900',
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Form

export interface IOTPForm {
  mask?: string;
  submit: (code: string) => void;
}

export const OTPForm:FC<IOTPForm> = ({
  mask = '****',
  submit,
}) => {
  const [code, setCode] = useState('');

  const isComplete = (code: string) => {
    if (code.length < mask.length) return false;
    else return true;
  };

  useEffect(() => {
    if (isComplete(code)) submit(code);
  }, [code])

  const onChangeInputChar = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const value = input.value.replace(/[^0-9]/g, "");
    const newCode = (code + value).slice(0, mask.length);

    if (!value) return; // else accept input

    setCode(newCode);
    event.target.disabled = true;

    if (isComplete(newCode)) return; // else continue input

    let nextInput = (input.nextElementSibling as HTMLInputElement);

    if (nextInput && value.length > 1) { // support partial copypaste
      for (let step = 2; step <= value.length; step++ ) {
        nextInput = (nextInput?.nextElementSibling as HTMLInputElement) || null;
      }
    }

    if (nextInput) {
      nextInput.disabled = false;
      nextInput.focus();      
    }

    return;
  };

  const onKeyUpInputChar = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && code.length) { // Backspace feature
      setCode(code.slice(0, -1));
      const char = event.target as HTMLInputElement;
      const prev = char.previousElementSibling as HTMLInputElement
      if (char && prev) {
        char.disabled = true;
        prev.disabled = false;
        prev.focus();
      }
    };
  };

  return (
    <section className={STYLE_CLASS.component}>
      <h2 className={STYLE_CLASS.title}>{TEXT_LABEL.title}</h2>
      <fieldset className={STYLE_CLASS.fieldset}>
        {
          [...mask].map((char, index) => { return (
            <InputCharOTPForm
              key={index}
              index={index}
              value={code[index]||''}
              onChange={onChangeInputChar}
              onKeyUp={onKeyUpInputChar}
              />
          )})
        }
      </fieldset>
    </section>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Input char

export interface IInputCharOTPForm {
  index: number;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const InputCharOTPForm:FC<IInputCharOTPForm> = ({
  index,
  value = '',
  onChange,
  onKeyUp,
}) => {
  return (
      <input
        className={STYLE_CLASS.input}
        type="text"
        placeholder=""
        value={value}
        tabIndex={index}
        disabled={index === 0 ? false : true}
        autoFocus={index !== 0 ? false : true}
        onChange={onChange}
        onKeyUp={onKeyUp}
        />
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default OTPForm;
