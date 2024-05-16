import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthPage } from './pages/AuthPage'
import { UserPage } from './pages/UserPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getUser } from './store/user/userAsyncActions'
import { logOut } from './store/user/userSlice'
import { AppDispatch } from './store'
import { useTypedSelector } from './hooks/useTypeSelector'
import { EditUser } from './pages/EditUser'

const App: React.FC = () => {
  const { user } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const token = localStorage.token

  const router = createBrowserRouter([
    {
      path: '/',
      element: localStorage.token || user ? <UserPage /> : <AuthPage />,
    },
    { path: '/edit', element: <EditUser /> },
  ])

  useEffect(() => {
    if (!user && token) {
      dispatch(getUser())
    }

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!token) dispatch(logOut())
    })
  }, [dispatch, token, user])

  return (
    <Suspense fallback={'Loading...'}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Suspense>
  )
}

export default App
