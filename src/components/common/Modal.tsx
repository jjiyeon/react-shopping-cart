import { Link } from '@tanstack/react-router'

type ModalProps = {
  isOpen: boolean
  message?: string
  variant?: 'success' | 'error' | 'caution'
  setModalStatus: () => void
}

const Modal = ({ props }: { props: ModalProps }) => {
  return (
    <div className={`modal_dim}`}>
      <div className="modal_container">
        <p>장바구니에 담았어요!</p>
        <p>{props.message}</p>
        <div className="action_button">
          <button onClick={() => props.setModalStatus()}>닫기</button>
          <Link to="/cart">장바구니 바로가기</Link>
        </div>
      </div>
    </div>
  )
}

export default Modal
