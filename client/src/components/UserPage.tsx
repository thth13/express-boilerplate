import { useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypesSelector'
import { useDispatch } from 'react-redux'
import { getUser } from '../store/actions/user'
import { UserActions } from '../types/user'
import { useActions } from '../hooks/useAction'

export const UserPage: React.FC = () => {
  const { user, error, loading } = useTypedSelector((state) => state.user)
  const { getUser } = useActions()

  useEffect(() => {
    getUser()
  }, [])

  if (loading) {
    return <h1>Loader...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <>
      <h1>LOL</h1>
      <p>{user && user.login}</p>
    </>
  )
}
