import useAlert from '@lib/hooks/use-alert'
import { FunctionComponent, useEffect } from 'react'
import styles from '@styles/components/modal/alert-moda.module.scss'

/**
 * # Alert
 *
 * the alert modal
 * for all of the conditions state
 *
 * @returns JSX.Element
 */
const Alert: FunctionComponent = (): JSX.Element => {
  const { data, hide } = useAlert()

  // automatically
  // close the alert when time up
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        hide()
      }, 2000)
    }
  }, [data])

  return (
    <>
      {data && (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={`${styles.icon} ${styles[data.type]}`}>
              <i
                className={`${
                  data.type == 'success'
                    ? 'fi fi-rr-badge-check'
                    : 'fi fi-rr-rocket-lunch'
                }`}
              ></i>
            </div>
            <div className={styles.detail}>
              <h5>{data.title}</h5>
              <span>{data.description}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Alert
