import { useQuery, useQueryClient } from '@tanstack/react-query'

interface AlertData {
  type: 'success' | 'error'
  title: string
  description: string
}

interface UseAlertReturn {
  data?: AlertData
  show: (data: AlertData) => void
  hide: () => void
}

/**
 * # userAlert
 *
 * hooks to show and hide
 * the current alert
 *
 * @returns UseAlertReturn
 */
const useAlert: () => UseAlertReturn = () => {
  const queryClient = useQueryClient()

  return {
    data: useQuery<AlertData | null>(['alert'], () => null).data,
    show: (data) => {
      queryClient.setQueryData(['alert'], data)
    },
    hide: () => {
      queryClient.setQueryData(['alert'], null)
    },
  } as any
}

export default useAlert
