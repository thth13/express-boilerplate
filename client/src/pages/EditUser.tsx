import { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypeSelector'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { editUser } from '../store/user/userAsyncActions'
import { Button } from '../styles/Button'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ImagePreviewer from '../components/ImagePreviewer'

const ErrorMsg = styled.span`
  color: red;
  margin-top: -10px;
  margin-bottom: 15px;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100svh;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f9f0f0;
  padding: 50px 200px;
  border-radius: 20px;
`

const Label = styled.label`
  margin-bottom: 5px;
`

const TextField = styled.input`
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: #fff;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 287px;
  font-size: 16px;
  border-color: ${(props) => props.onError && 'red'};
`

const SaveButton = styled(Button)`
  margin-top: 15px;
`

const PreloaderAvatar = styled.div`
  width: 169px;
  height: 169px;
  background-color: #cfcfcf;
  border-radius: 50%;
`

export const EditUser: React.FC = () => {
  const { user, errors, loading } = useTypedSelector((state) => state.user)
  const [fields, setFields] = useState<any>({
    login: user?.login,
    firstName: user?.firstName,
    lastName: user?.lastName,
    avatar: user?.avatar,
  })
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const navigate = useNavigate()
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value })
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(editUser({ fields, navigate, userId: user?._id }))
  }

  const changeAvatar = (avatar: string) => {
    setFields({ ...fields, avatar, userId: user?.id })
  }

  useEffect(() => {
    if (user) {
      setFields(user)
    }
  }, [user])

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {user ? (
          <ImagePreviewer
            changeAvatar={changeAvatar}
            avatar={
              user?.avatar && `http://localhost:8000/uploads/${user.avatar}`
            }
          />
        ) : (
          <PreloaderAvatar />
        )}
        <Label htmlFor="login">Login</Label>
        <TextField
          value={fields.login}
          name="login"
          onChange={onChange}
          placeholder="User name"
          onError={errors?.errors?.login}
        />
        <ErrorMsg>{errors?.errors?.login}</ErrorMsg>
        <Label htmlFor="login">Name</Label>
        <TextField
          value={fields.firstName}
          name="firstName"
          onChange={onChange}
          placeholder="First Name"
          onError={errors?.errors?.firstName}
        />
        <ErrorMsg>{errors?.errors?.firstName}</ErrorMsg>
        <Label htmlFor="login">Surname</Label>
        <TextField
          value={fields.lastName}
          name="lastName"
          onChange={onChange}
          placeholder="Last Name"
          onError={errors?.errors?.lastName}
        />
        <ErrorMsg>{errors?.errors?.lastName}</ErrorMsg>
        <SaveButton disabled={loading} type="submit">
          Save
        </SaveButton>
      </Form>
    </Wrapper>
  )
}
