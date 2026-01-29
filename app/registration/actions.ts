'use client'; // 'use server'; // Server Actions are not supported with static export.

import { z as validationTool } from 'zod';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Validation config

const validationSchema = validationTool.object({
  name: validationTool.string().min(2).max(100),
  email: validationTool.string().email(),
  password: validationTool.string().min(4),
  repassword: validationTool.string().min(4),
  checkbox: validationTool.refine(v => !!v, {message: "Is required"}),
}).refine((data) => data.password === data.repassword, {
  message: "Passwords don't match",
  path: ['repassword'],
});

const validate = validationSchema.safeParse;

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Action submit

export async function submitRegistration(_: unknown, formData: FormData) {
  const formValues = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    repassword: formData.get('repassword') as string,
    checkbox: formData.get('checkbox') as string,
  };

  const { success, error, data } = validate(formValues);

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      values: formValues,
    };
  }

  // Mocked processing ...
  await new Promise((resolve) => {
    const TIME_DELAY = 2000;
    setTimeout(resolve, TIME_DELAY);
  });
  // ... registration success!

  return {
    success: true,
  };
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ eof
