import Modal from '../common/Modal'
import { useQuery } from '@tanstack/react-query'
import { getProductDetailItem } from '../../api/cart'
import useModal from '../../hooks/useModal'
import useCart from '../../hooks/useCart'

const Detail = ({ id }: { id: string }) => {
  const { orderContext, actions } = useCart()

  const { isOpen, setIsOpenModal } = useModal()

  const { data: detail } = useQuery({
    queryKey: ['detailItem', id],
    queryFn: () => {
      return getProductDetailItem(id)
    },
  })

  if (!detail) return null
  return (
    <div className="product-detail-container">
      {isOpen && <Modal props={{ isOpen, setModalStatus: () => setIsOpenModal((state) => !state) }} />}
      {detail && (
        <div className="flex-col-center w-520">
          <img className="w-480 h-480 mb-10" src={detail.imageUrl} alt={detail.name} />
          <div className="product-detail-info">
            <span className="product-detail-info__name">{detail.name}</span>
            <hr className="divide-line-gray my-20" />
            <div className="flex justify-between">
              <span>금액</span>
              <span className="product-detail-info__price">{detail.price}원</span>
            </div>
          </div>
          <button
            className="product-detail-button flex-center mt-20"
            onClick={() => {
              setIsOpenModal(true)
              actions('ADD_CART_ITEM', [{ ...detail, quantity: 1 }])
            }}
          >
            장바구니
          </button>
        </div>
      )}
    </div>
  )
}

export default Detail
