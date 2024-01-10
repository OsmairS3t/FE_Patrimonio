import { FieldError } from 'react-hook-form'

interface InputFormProps extends HTMLInputElement {
  label: string
  field: string
  errors?: FieldError
}

export function InputForm({ label, field, errors }: InputFormProps) {
  return (
    <>
      <label htmlFor={field}>{label}:</label>
      <input
        className="p-2 w-96 rounded border-[1px] border-gray-300 bg-gray-200"
        id={field}
      />
      {errors && (
        <span className="text-red-500 font-light italic">{errors.message}</span>
      )}
    </>
  )
}
