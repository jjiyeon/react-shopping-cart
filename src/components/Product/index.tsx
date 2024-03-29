import { useContext, useRef } from 'react'
import CartLogo from '../../assets/svgs/cart.svg?react'
import { CartContext, UpdateCartContext } from '../../context/cartsContext'
import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getProductList } from '../../api/cart'

const ProductList = () => {
  const productRef = useRef<HTMLLIElement>(null)
  const cartsContext = useContext(CartContext)
  const updateCartContext = useContext(UpdateCartContext)

  const navigate = useNavigate()

  const { data: productList } = useQuery({
    queryKey: ['productList'],
    queryFn: () => {
      return getProductList()
    },
  })

  if (!productList) return null

  return (
    <div className="product-container">
      <ul className="product_list">
        {productList.map((item) => (
          <li
            className="list_box"
            key={item.id}
            ref={productRef}
            role="link"
            onClick={(e) => {
              if (e.target !== productRef.current) return
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
                onClick={() => {
                  updateCartContext({ ...cartsContext, cart: [...cartsContext.cart, { ...item, quantity: 1 }] })
                  navigate({ to: '/cart' })
                }}
              >
                <CartLogo />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
