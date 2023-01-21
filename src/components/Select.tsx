import { SelectHTMLAttributes } from 'react'
import { Field } from 'formik'

export interface Option {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  options: Option[]
}

const Select = ({ className, name, options, ...rest }: SelectProps) => {
  return (
    <Field
      name={name}
      as="select"
      className={className}
      aria-required={rest.required}
      {...rest}
    >
      <option value="">
        {!options.length ? 'No options' : 'Select an option'}
      </option>
      {options.map(({ label, value }) => {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        )
      })}
    </Field>
  )
}

export default Select
