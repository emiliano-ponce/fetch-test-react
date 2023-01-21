import { object, string, InferType } from 'yup'
import { Field } from '../components/FormField'
import { Option } from '../components/Select'

export const userSchema = object({
  name: string().required('Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Must be 8 characters or more')
    .matches(/[a-z]+/, 'Needs one lowercase character')
    .matches(/[A-Z]+/, 'Needs one uppercase character')
    .matches(/[@$!%*#?&]+/, 'Needs one special character')
    .matches(/\d+/, 'Needs one number'),
  occupation: string().required('Occupation is required'),
  state: string().required('State is required'),
})

export interface UserEntry extends InferType<typeof userSchema> {}

export type UserFieldOptions = { occupations: Option[]; states: Option[] }

type UserField = Field<UserEntry> & {
  name: keyof UserEntry
}

export const getUserFields = (userOptions: UserFieldOptions): UserField[] => [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'Edward Cullen'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder:'example@example.com'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    helperText:
      'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 special, & 1 number',
      placeholder: 'Please enter a password'
  },
  {
    name: 'occupation',
    label: 'Occupation',
    type: 'select',
    required: true,
    options: userOptions.occupations,
  },
  {
    name: 'state',
    label: 'State',
    type: 'select',
    required: true,
    options: userOptions.states,
  },
]
