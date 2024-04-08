import { useContext, useEffect, useRef } from 'react'
import CartLogo from '../../assets/svgs/cart.svg?react'
import { CartContext, Product, UpdateCartContext } from '../../context/cartsContext'
import { useNavigate } from '@tanstack/react-router'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getProductAPI, getProductList } from '../../api/cart'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import useCart from '../../hooks/useCart'

const ProductList = () => {
  const productRef = useRef<HTMLLIElement>(null)

  const { orderContext, actions } = useCart()
  const navigate = useNavigate()
  const infiniteObserverRef = useRef<HTMLDivElement>(null)

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
    }
  }
  if (!productList?.pages) return null

  return (
    <div className="product-container">
      <ul className="product_list">
        {productList.pages.map((item) => (
          <li
            className="list_box"
            key={item.id}
            ref={productRef}
            role="link"
            onClick={(e) => {
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
                  handleAddCartClick(item)
                  // updateCartContext({ ...cartsContext, cart: [...cartsContext.cart, { ...item, quantity: 1 }] })
                  // navigate({ to: '/cart' })
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
