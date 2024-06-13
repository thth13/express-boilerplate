import { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { registerUser, loginUser } from '../store/user/userAsyncActions'
import { clearErrors, setErrors } from '../store/user/userSlice'
import { useTypedSelector } from '../hooks/useTypeSelector'
import { AppDispatch } from '../store'
import { TextField } from '../styles/TextField'
import { Form } from '../styles/Form'
import { Button } from '../styles/Button'

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
  margin: 0 auto;
  height: 100svh;
`

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 5px;
  font-weight: normal;
  font-size: 36px;
`

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 30px;
  font-weight: normal;
  font-size: 16px;
`

const TextLink = styled.a`
  color: #4472cb;
  cursor: pointer;
  &:hover {
    color: #6883b9;
  }
  margin-left: auto;
`

const ErrorMsg = styled.span`
  color: red;
  margin-top: -10px;
  margin-bottom: 15px;
`

const initialFields = {
  login: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const AuthPage: React.FC = () => {
  const { errors, loading } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const [isAuth, setIsAuth] = useState<boolean>(true)
  const [fields, setFields] = useState<IUserLogin>(initialFields)

  const changeIsAuth = () => {
    setFields(initialFields)
    dispatch(clearErrors())
    setIsAuth(!isAuth)
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isAuth) {
      dispatch(loginUser({ email: fields.email, password: fields.password }))
    } else {
      if (fields.password === fields.confirmPassword) {
        dispatch(registerUser(fields))
      } else {
        dispatch(setErrors({ confirmPassword: 'Passwords do not match' }))
      }
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <H1>{isAuth ? 'Login' : 'Register'}</H1>
        <H2>
          {isAuth
            ? 'Hi, welcome back'
            : 'Enter your details to create your account'}
        </H2>
        {!isAuth && (
          <>
            <TextField
              onChange={onChange}
              value={fields.login}
              name="login"
              placeholder="Username"
              onError={errors?.login}
            />
            <ErrorMsg>{errors?.login}</ErrorMsg>
          </>
        )}
        <TextField
          onChange={onChange}
          name="email"
          value={fields.email}
          placeholder="Email"
          onError={errors?.email}
        />
        <ErrorMsg>{errors?.email}</ErrorMsg>
        <TextField
          onChange={onChange}
          name="password"
          value={fields.password}
          placeholder="Password"
          type="password"
          onError={errors?.password}
        />
        <ErrorMsg>{errors?.password}</ErrorMsg>
        {!isAuth && (
          <>
            <TextField
              onChange={onChange}
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              value={fields.confirmPassword}
              // TODO: fix it
              onError={errors?.confirmPassword}
            />
            <ErrorMsg>{errors?.confirmPassword}</ErrorMsg>
          </>
        )}
        {/* {isAuth && <TextLink>Forgot password?</TextLink>} */}
        <Button disabled={loading} type="submit">
          {isAuth ? 'Login' : 'Register'}
        </Button>
        <span>
          {isAuth ? 'Not registered yet?' : 'Already have account?'}{' '}
          <TextLink onClick={changeIsAuth}>
            {isAuth ? 'Create an account' : 'Login'}
          </TextLink>
        </span>
      </Form>
    </Wrapper>
  )
}
