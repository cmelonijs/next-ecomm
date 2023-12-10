"use client"

import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required("Un nome è richiesto."),
  email: yup.string().email("Inserisci un'email valida.").required("Un'email' è richiesta."),
  password: yup.string().min(8, "La password deve avere minimo 8 caratteri.").required("Una password è richiesta."),
})

export default function SignUp() {
  const {values, handleBlur, handleChange, handleSubmit, isSubmitting, errors, touched} = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: ''
      },
      validationSchema,
      onSubmit: (values) => {
        console.log('values', values)
      }
    }
  )
  const formErrors: string[] = [];

  console.log('errosrs', errors)
  const {name, email, password} = values

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input name="name" label="Name" onChange={handleChange} value={name} crossOrigin={undefined} />
      <Input name="email" label="Email" onChange={handleChange} value={email} crossOrigin={undefined} />
      <Input name="password" label="Password" type="password" onChange={handleChange} value={password} crossOrigin={undefined} />
      <Button type="submit" className="w-full">
        Sign up
      </Button>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}