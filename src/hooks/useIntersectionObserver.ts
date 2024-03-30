import { RefObject, useEffect, useState } from 'react'

interface ObserverProps {
  target: RefObject<HTMLLIElement> | RefObject<HTMLDivElement>
  threshold?: number
  callback: (fn: () => void) => void
}

const useIntersectionObserver = ({ target, threshold = 0, callback }: ObserverProps) => {
  const [isWaiting, setIsWaiting] = useState(false)

  const setIsReady = () => {
    setIsWaiting(false)
  }

  useEffect(() => {
    if (!target.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsWaiting(true)
          callback(setIsReady)
        }
      },
      { threshold }
    )

    observer.observe(target.current)

    return () => {
      if (target.current !== null && observer) {
        observer.unobserve(target.current)
      }
    }
  }, [target, threshold, callback, setIsReady])

  return { setIsReady } as const
}

export default useIntersectionObserver
