'use client'; // 'use server'; // Server Actions are not supported with static export.

import { z as validationTool } from 'zod';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Config

const INCORRECT_EMAIL = 'incorrect@email.com';
const INCORRECT_EMAIL_TEXT = 'Special case triggered: incorrect email';
const INCORRECT_PASSWORD = 'incorrect-password';
const INCORRECT_PASSWORD_TEXT = 'Special case triggered: incorrect password';
const HARDCODED_OTP_FAIL = '0000';
const TIME_DELAY = 2000;

interface IO {
  [key: string]: any;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Validation config

const validationSchema = validationTool.object({
  email: validationTool.string().email(),
  password: validationTool.string().min(4),
});

const validate = validationSchema.safeParse;

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Action submit login

export async function submitLogin(_: unknown, formData: FormData): Promise<IO> {
  const formValues = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { success, error, data } = validate(formValues);

  if (!success) {
    return {
      success: false,
      errors: error.flatten().fieldErrors,
      values: formValues,
    };
  }

  const response = await mockedLoginResponse(formValues);
  
  return response;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Login response

export async function mockedLoginResponse(loginValues: {[key: string]: any}): Promise<IO> {
  const errors = [];

  // Feature incorrect email
  const { email } = loginValues;
  if (email === INCORRECT_EMAIL) errors.push({email:[INCORRECT_EMAIL_TEXT]});

  // Feature incorrect password
  const { password } = loginValues;
  if (password === INCORRECT_PASSWORD) errors.push({password:[INCORRECT_PASSWORD_TEXT]});

  // Mocked processing ...
  await new Promise((resolve) => {
    setTimeout(resolve, TIME_DELAY);
  });
  // ... ready!

  if (errors.length) return {
    errors: errors.reduce((o,c)=>({...o,...c}), {}),
    values: loginValues,
  };

  return {
    success: true,
    values: loginValues,
  };
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ OTP

export interface IResponceOTPConfirm {
  success: boolean;
};

export async function MockFetchOTPConfirm(code: string): Promise<IResponceOTPConfirm> {
  const isSuccess = (code: string) => code && code !== HARDCODED_OTP_FAIL;
  const responce = isSuccess(code)
    ? {success:true}
    : {success:false}
    ;

  await new Promise((resolve) => {
    setTimeout(resolve, TIME_DELAY);
  });

  return responce;
};


// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ eof
