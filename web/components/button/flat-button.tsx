import { FunctionComponent, ReactNode } from 'react'
import styles from '@styles/components/button/flat-button.module.scss'
import { useRouter } from 'next/router'

interface FlatButtonProps {
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
 * # FlatButton
 *
 * button with flat styles
 *
 * @returns JSX.Element
 */
const FlatButton: FunctionComponent<FlatButtonProps> = ({
  children,
  className,
  disabled,
  form,
  processed,
  type,
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
      type={type}
      disabled={disabled}
      form={form}
      onClick={link ? openLink : onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  )
}

export default FlatButton
