import Modal from '../common/Modal'
import useModal from '../../hooks/useModal'
import useCart from '../../hooks/useCart'

const OrderList = () => {
  const { orderContext, actions } = useCart()

  const { isOpen, setIsOpenModal } = useModal()

  return (
    <section className="order-section">
      {isOpen && (
        <Modal
          props={{
            isOpen,
            setModalStatus: () => setIsOpenModal((state) => !state),
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
              <div key={order.id} className="order-row">
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
                    actions('ADD_CART_ITEM', [order])
                    // addCartItem([order])
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
