import { FunctionComponent, ReactNode } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

interface FormProps {
  context: UseFormReturn
  onSubmit: (data: any) => void
  children?: ReactNode | ReactNode[]
  className?: string
}

/**
 * # Form
 *
 * the form to handle the
 * inputs
 * @returns JSX.Element
 */
const Form: FunctionComponent<FormProps> = ({
  context,
  onSubmit,
  children,
  className,
}): JSX.Element => {
  const { handleSubmit } = context

  return (
    <FormProvider {...context}>
      <form
        action="post"
        onSubmit={handleSubmit(onSubmit)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
