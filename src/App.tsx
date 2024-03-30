import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { useContext } from 'react'
import CartsProvider, { CartContext } from './context/cartsContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    myOrder: {
      cart: [],
      order: [],
    },
  },
})

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
function App() {
  const myOrder = useContext(CartContext)
  return (
    <QueryClientProvider client={queryClient}>
      <CartsProvider>
        <RouterProvider router={router} context={{ myOrder }} />
      </CartsProvider>
    </QueryClientProvider>
  )
}

export default App
