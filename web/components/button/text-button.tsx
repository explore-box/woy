import { FunctionComponent, ReactNode } from 'react'
import styles from '@styles/components/button/text-button.module.scss'
import { useRouter } from 'next/router'

interface TextButtonProps {
  children?: ReactNode | ReactNode[]
  className?: string
  type?: 'button' | 'submit'
  form?: string
  disabled?: boolean
  processed?: boolean
  link?: string
  onClick?: () => void
}

/**
 * # TextButton
 *
 * button for text type
 * @returns JSX.Element
 */
const TextButton: FunctionComponent<TextButtonProps> = ({
  children,
  className,
  disabled,
  processed,
  form,
  type = 'button',
  link,
  onClick,
}): JSX.Element => {
  const router = useRouter()

  const openLink = () => {
    if (link!.includes('http://') || link!.includes('https://')) {
      window.open(link!)
    } else {
      router.push(link!)
    }
  }

  return (
    <button
      disabled={disabled}
      form={form}
      type={type}
      onClick={link ? openLink : onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  )
}

export default TextButton
