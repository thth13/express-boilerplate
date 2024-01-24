import { Provider } from 'react-redux'
import { AuthModal } from './components/AuthModal'
import { store } from './store'
import { TodoList } from './components/TodoList'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <AuthModal /> */}
        <TodoList />
      </div>
    </Provider>
  )
}

export default App
