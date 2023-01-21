import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react'

import Input from './Input'
import Select, { Option } from './Select'

interface FieldBase {
  label: string
  required?: boolean
  helperText?: string
}
interface InputField extends FieldBase, InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute
}
interface SelectField
  extends FieldBase,
    SelectHTMLAttributes<HTMLSelectElement> {
  type: 'select'
  options: Option[]
}
export type Field<T> = { name: keyof T } & (InputField | SelectField)

interface FormFieldProps<T> {
  field: Field<T>
}
const FormField = <T,>({ field }: FormFieldProps<T>) => {
  const { name, label, required, helperText } = field

  return (
    <div className="group">
      <label
        htmlFor={name.toString()}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white group-focus-within:text-fetch-purple group-focus-within:font-semibold dark:group-focus-within:text-fetch-gold"
      >
        {label}
        {required && ' *'}
      </label>
      <FieldComponent
        field={field}
        className="w-full rounded-lg bg-fetch-offWhite focus:border-fetch-purple dark:focus:border-fetch-gold focus:ring-fetch-purple dark:focus:ring-fetch-gold hover:ring-fetch-purple dark:hover:ring-fetch-gold hover:border-fetch-purple dark:hover:border-fetch-gold"
      />
      {helperText && (
        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-900 dark:text-fetch-gold"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

interface FieldComponentProps<T> {
  className: string
  field: Field<T>
}
const FieldComponent = <T,>({ className, field }: FieldComponentProps<T>) => {
  const { name, required, ...rest } = field
  if ('options' in rest) {
    const { options, ...selectProps } = rest
    return (
      <Select
        options={options}
        className={className}
        name={name.toString()}
        {...selectProps}
      />
    )
  } else {
    return <Input className={className} name={name.toString()} {...rest} />
  }
}

export default FormField
