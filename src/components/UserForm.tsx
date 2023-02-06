import { useEffect, useState, useRef, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { Form, Formik, FormikHelpers } from 'formik'

import Spinner from './Spinner'
import FormField from './FormField'
import { formService } from '../lib/formService'
import {
  UserEntry,
  userSchema,
  getUserFields,
  UserFieldOptions,
} from '../lib/userSchema'

const UserForm = () => {
  const [options, setOptions] = useState<UserFieldOptions>({
    occupations: [],
    states: [],
  })
  const loadingOptions = useRef(false)
  const fields = useMemo(() => getUserFields(options), [options])

  const getOptions = async () => {
    try {
      loadingOptions.current = true
      const { occupations, states } = await formService.getOptions()
      setOptions({
        occupations: occupations.map((o) => ({ label: o, value: o })),
        states: states.map(({ name: label, abbreviation: value }) => ({
          label,
          value,
        })),
      })
    } catch (err) {
      toast.error('Something went wrong.')
      console.error(err)
    } finally {
      loadingOptions.current = false
    }
  }

  useEffect(() => {
    if (!loadingOptions.current) getOptions()
  }, [])

  const handleSubmit = async (
    values: UserEntry,
    helpers: FormikHelpers<UserEntry>
  ) => {
    const { setSubmitting, resetForm } = helpers
    try {
      await toast.promise(formService.createUser(values), {
        loading: 'Submitting...',
        error: 'Failed to create user.',
        success: 'User created!',
      })
      resetForm()
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="sm:w-96 mx-4 sm:mx-auto">
      <h1 className="text-2xl mb-2 font-bold dark:text-white">
        Please fill out all fields:
      </h1>
      <div className="rounded-xl box-border p-5 dark:p-6 border-4 dark:border-0 border-fetch-purple  dark:bg-fetch-grayDark">
        <Formik
          validateOnMount
          initialValues={{
            name: '',
            email: '',
            password: '',
            occupation: '',
            state: '',
          }}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const { isSubmitting, isValid, errors, touched } = props
            const disabled = !isValid || isSubmitting
            return (
              <Form>
                {fields.map((field) => (
                  <div key={field.name} className="mb-2">
                    <FormField field={field} />
                    {errors[field.name] && touched[field.name] && (
                      <div className="text-red-500 font-bold text-sm mt-1">
                        {errors[field.name]}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-end">
                  <button
                    disabled={disabled}
                    className={`
                  ${
                    disabled
                      ? 'opacity-40 '
                      : 'cursor-pointer hover:opacity-70 '
                  }
                  bg-fetch-gold font-bold py-2 px-4 rounded-full text-black inline-flex items-center transition-all duration-300`}
                  >
                    {isSubmitting && (
                      <Spinner className="inline w-4 h-4 mr-3 text-black" />
                    )}
                    Submit
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </section>
  )
}

export default UserForm
