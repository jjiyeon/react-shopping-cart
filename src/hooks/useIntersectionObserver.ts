import { RefObject, useEffect, useState } from 'react'

interface ObserverProps {
  target: RefObject<HTMLLIElement> | RefObject<HTMLDivElement>
  threshold?: number
  callback: () => void
}

const useIntersectionObserver = ({ target, threshold = 0, callback }: ObserverProps) => {
  useEffect(() => {
    if (!target.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback()
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
  }, [target, threshold, callback])
}

export default useIntersectionObserver
