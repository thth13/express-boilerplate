import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useTypedSelector } from '../hooks/useTypeSelector'
import { editUser } from '../store/user/userAsyncActions'
import ImagePreviewer from '../components/ImagePreviewer'
import {
  Form,
  Label,
  TextField,
  SaveButton,
  PreloaderAvatar,
  Wrapper,
  StyledLink,
  List,
  ListItem,
  CancelButton,
} from './style'

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
        {errors && (
          <List>
            {errors.login && <ListItem>{errors.login}</ListItem>}
            {errors.firstName && <ListItem>{errors.firstName}</ListItem>}
            {errors.lastName && <ListItem>{errors.lastName}</ListItem>}
          </List>
        )}
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
          onError={errors?.login}
        />
        <Label htmlFor="login">Name</Label>
        <TextField
          value={fields.firstName}
          name="firstName"
          onChange={onChange}
          placeholder="First Name"
          onError={errors?.firstName}
        />
        <Label htmlFor="login">Surname</Label>
        <TextField
          value={fields.lastName}
          name="lastName"
          onChange={onChange}
          placeholder="Last Name"
          onError={errors?.lastName}
        />
        <StyledLink to="/changepassword">Change password</StyledLink>
        <SaveButton disabled={loading} type="submit">
          Save
        </SaveButton>
        <Link to="/">
          <CancelButton disabled={loading}>Cancel</CancelButton>
        </Link>
      </Form>
    </Wrapper>
  )
}
