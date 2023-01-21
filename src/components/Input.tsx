import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { Field } from 'formik'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type: HTMLInputTypeAttribute
  helperText?: string
}

const Input = ({
  className,
  name,
  type = 'text',
  helperText,
  ...rest
}: InputProps) => {
  return (
    <Field
      id={name}
      name={name}
      type={type}
      className={className}
      aria-required={rest.required}
      {...rest}
    />
  )
}

export default Input
