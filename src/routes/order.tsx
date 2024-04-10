import { createFileRoute } from '@tanstack/react-router'
import Order from '../components/Order'

export const Route = createFileRoute('/order')({
  component: () => <Order />,
})
