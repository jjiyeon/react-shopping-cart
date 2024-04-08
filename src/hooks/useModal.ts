import { useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpenModal] = useState(false)

  return { isOpen, setIsOpenModal }
}

export default useModal
