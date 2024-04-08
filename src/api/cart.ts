import { Order, Product } from '../context/cartsContext'
export interface Pagination<Product> {
  content: Array<Product>
  totalElements: number
  totalPages: number
  nextPageParam?: number
  previousPageParam?: number
}
export interface ProductsPage {
  response: {
    content: Array<Product>
    totalElements: number
    nextPageParam: number
    previousPageParam: number
  }
}

interface ResponseDetail {
  response: Product
}
export const getOrderList = async () => {
  const response = await fetch('/orders')
  const data: Array<Order> = await response.json()
  return data
}

// 여기부터
export const getProductAPI = async ({ page }: { page: number }) => {
  const response = await fetch(`https://lgbbwcvwtbrudityxxbd.supabase.co/functions/v1/products?page=${page}`, {
    headers: {
      uid: 'a4f55b13-be32-4e75-bfe6-119fdd7367e0',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnYmJ3Y3Z3dGJydWRpdHl4eGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0MzY5MzgsImV4cCI6MjAyNzAxMjkzOH0.V4nEgkFClH7OPi0glqZIQOtvpYkpirAcBGLCp8mJQiw',
    },
  })
  const data: ProductsPage = await response.json()
  return data
}
export const getProductList = async () => {
  const response = await fetch('/products')
  const data: Array<Product> = await response.json()

  return data
}
export const getProductPage = async (param: string) => {
  const response = await fetch(`/products?page=${param}`)
  const data: Array<Product> = await response.json()

  return data
}

export const getProductDetailItem = async (param: string) => {
  // const response = await fetch(`/products/${param}`)
  const response = await fetch(`https://lgbbwcvwtbrudityxxbd.supabase.co/functions/v1/products/${param}`, {
    headers: {
      uid: 'a4f55b13-be32-4e75-bfe6-119fdd7367e0',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnYmJ3Y3Z3dGJydWRpdHl4eGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0MzY5MzgsImV4cCI6MjAyNzAxMjkzOH0.V4nEgkFClH7OPi0glqZIQOtvpYkpirAcBGLCp8mJQiw',
    },
  })
  const data: ResponseDetail = await response.json()
  return data.response
}

export const postUser = async (param: string) => {
  console.log(111, param)
  const response = await fetch(`/user`, {
    method: 'POST',
    body: JSON.stringify({
      name: param,
    }),
  })
  const data: {
    id: string
    created_at: string
    name: string
  } = await response.json()

  return data
}
