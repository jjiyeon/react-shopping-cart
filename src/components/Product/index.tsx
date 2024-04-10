import { useRef } from 'react'
import CartLogo from '../../assets/svgs/cart.svg?react'
import { Product } from '../../context/cartsContext'
import { useNavigate } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getProductAPI } from '../../api/cart'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import useCart from '../../hooks/useCart'
import useModal from '../../hooks/useModal'
import Modal from '../common/Modal'

const ProductList = () => {
  const navigate = useNavigate()

  const productRef = useRef<HTMLLIElement[]>([])
  const infiniteObserverRef = useRef<HTMLDivElement>(null)

  const { orderContext, actions } = useCart()
  const { isOpen, setIsOpenModal } = useModal()

  const {
    data: productList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['producetKey'],
    queryFn: ({ pageParam = 0 }) => getProductAPI({ page: pageParam }),
    initialPageParam: 0,

    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length
      return lastPage.response.content.length === 0 ? undefined : nextPage
    },
    select: (data) => {
      return { pages: data.pages.flatMap((page) => page.response.content), pageParams: data.pageParams }
    },
  })

  useIntersectionObserver({
    target: infiniteObserverRef,
    callback: () => {
      if (hasNextPage) fetchNextPage()
    },
  })

  const handleAddCartClick = (param: Product) => {
    const itemAmount = orderContext.cart.filter((item) => item.id === param.id)
    if (itemAmount.length) {
      actions('UPDATE_ITEM_QUANTITY', [{ ...param, quantity: itemAmount[0].quantity++ }])
    } else {
      actions('ADD_CART_ITEM', [{ ...param, quantity: 1 }])
    }
  }
  if (!productList?.pages) return null

  return (
    <div className="product-container">
      {isOpen && (
        <Modal
          props={{
            isOpen,
            setModalStatus: () => setIsOpenModal((state) => !state),
          }}
        />
      )}
      <ul className="product_list">
        {productList.pages.map((item, idx) => (
          <li
            className="list_box"
            key={item.id}
            ref={(el: HTMLLIElement) => (productRef.current[idx] = el)} // ref는 사실, click시, e.target과 currentTarget을 구분해서 장바구니 추가를 하고 싶었답니다..
            role="link"
            onClick={() => {
              navigate({ to: '/list/$id', params: { id: String(item.id) } })
            }}
          >
            <div className="image_box">
              <img src={item.imageUrl} alt="product image " />
            </div>
            <div className="item_info">
              <div className="text_box">
                <p className="item_name">{item.name}</p>
                <p className="item_price">{item.price}원</p>
              </div>
              <button
                className="add_cart"
                onClick={(e) => {
                  if (e.target !== productRef.current[idx]) {
                    e.stopPropagation()
                    handleAddCartClick(item)
                    setIsOpenModal(true)
                  }
                }}
              >
                <CartLogo />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div ref={infiniteObserverRef} style={{ width: '100%', height: '50px', background: 'tomato' }}></div>
    </div>
  )
}

export default ProductList
