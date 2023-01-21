import { Toaster, ToastIcon, resolveValue } from 'react-hot-toast'

const TailwindToaster = () => {
  return (
    <Toaster>
      {(t) => (
        <div className="rounded shadow-lg flex transform p-3 text-white bg-fetch-purple dark:bg-fetch-grayDark">
          <ToastIcon toast={t} />
          <p className="px-2">{resolveValue(t.message, t)}</p>
        </div>
      )}
    </Toaster>
  )
}

export default TailwindToaster
