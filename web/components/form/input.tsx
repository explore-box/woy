import { FunctionComponent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from '@styles/components/form/input.module.scss'

interface BaseInputProps {
  name: string
  label?: string
  placeholder?: string
  preIcon?: string
  value?: any
}

/**
 * # TextInput
 *
 * the input of text
 * use to catch text type
 *
 * @returns JSX.Element
 */
const TextInput: FunctionComponent<BaseInputProps> = ({
  name,
  label,
  placeholder,
  preIcon,
  value,
}): JSX.Element => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    setValue(name, value)
  }, value)

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={`${name}-input`} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.input}>
        {preIcon && <i className={preIcon}></i>}

        <input
          type="text"
          id={`${name}-input`}
          {...register(name)}
          className=""
          placeholder={placeholder}
        />
      </div>
      {errors[name]?.message && (
        <span className={styles.message}>
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  )
}

export { TextInput }
