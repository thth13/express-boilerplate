import { useEffect } from 'react'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypesSelector'

export const TodoList: React.FC = () => {
  const { page, error, loading, todos, limit } = useTypedSelector(
    (state) => state.todo,
  )
  const { fetchTodos } = useActions()

  useEffect(() => {
    fetchTodos(page, limit)
  }, [])

  if (loading) {
    return <h1>Loading</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }
  console.log(todos)
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.id} - {todo.title}
        </div>
      ))}
    </div>
  )
}
