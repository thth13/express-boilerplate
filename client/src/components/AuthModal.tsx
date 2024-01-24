import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useTypedSelector } from '../hooks/useTypesSelector'

export interface IUserLogin {
  login: string
  email: string
  password: string
  confirmPassword?: string
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rebeccapurple;
  margin: 0 auto;
  height: 100svh;
`

const Form = styled.form`
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 75px;
  border-radius: 10px;
`
// const Button = styled.button``

export const AuthModal = () => {
  // const state = useTypedSelector((state) => state)
  const { user } = useTypedSelector((state) => state.user)

  console.log(user)
  const [isAuth, setIsAuth] = useState<boolean>(true)
  const [fields, setFields] = useState<IUserLogin>({
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const changeIsAuth = () => {
    setIsAuth(!isAuth)
  }

  const onChange = (e: any) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const onSubmit = () => {}

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {!isAuth && (
          <input
            onChange={onChange}
            value={fields.login}
            name="login"
            placeholder="Login"
          />
        )}
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" type="password" />
        {!isAuth && (
          <input
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
          />
        )}
        <button>{isAuth ? 'Login' : 'Register'}</button>
        <p>
          {isAuth ? 'No have account?' : 'Already have account?'}{' '}
          <a onClick={changeIsAuth}>{isAuth ? 'Register' : 'Login'}</a>
        </p>
      </Form>
    </Wrapper>
  )
}
