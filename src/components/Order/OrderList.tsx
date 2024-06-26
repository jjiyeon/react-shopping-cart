import { useContext } from 'react'
import { CartContext, UpdateCartContext } from '../../context/cartsContext'
import Modal from '../common/Modal'
import useModal from '../../hooks/useModal'

const OrderList = () => {
  const orderContext = useContext(CartContext)
  const updateCartContext = useContext(UpdateCartContext)

  const { title, isOpen, setIsOpenModal } = useModal({ title: '장바구니에 담았어요!' })

  return (
    <section className="order-section">
      {isOpen && (
        <Modal
          props={{
            title,
            isOpen,
            setModalStatus: () => setIsOpenModal,
          }}
        />
      )}
      <header className="flex-col-center mt-20">
        <h2 className="order-section__title">주문 목록</h2>
        <hr className="divide-line mt-20" />
      </header>

      <div className="order-list">
        <div className="order-list__header">
          <span>주문번호: 1</span>
          <span>상세보기 {`>`}</span>
        </div>
        {orderContext.orderHistory.map((item) => (
          <div className="order-list-item" key={item.id}>
            {item.orderDetails.map((order) => (
              <div key={order.name} className="order-row">
                <div className="flex gap-15 mt-10 custom">
                  <img className="w-144 h-144" src={order.imageUrl} alt={order.name} />
                  <div className="flex-col gap-15">
                    <span className="order-name">{order.name}</span>
                    <span className="order-info">
                      {order.price}원 / 수량: {order.quantity}개
                    </span>
                  </div>
                </div>
                <button
                  className="primary-button-small flex-center self-start"
                  onClick={() => {
                    setIsOpenModal(true)
                    updateCartContext({ ...orderContext, cart: [...orderContext.cart, order] })
                  }}
                >
                  장바구니
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default OrderList
