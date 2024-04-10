import { createFileRoute } from '@tanstack/react-router'
import OrderList from '../components/Order/OrderList'

export const Route = createFileRoute('/orderList')({
  component: () => <OrderList />,
})
