import { useState } from 'react'

type ModalProps = {
  title?: string
}
const useModal = ({ title = '확인해주세요.' }: ModalProps) => {
  const [isOpen, setIsOpenModal] = useState(false)
  const props = {
    title: title,
    setModalStatus: () => setIsOpenModal((state) => !state),
  }
  return { isOpen, setIsOpenModal, ...props }
}

export default useModal
