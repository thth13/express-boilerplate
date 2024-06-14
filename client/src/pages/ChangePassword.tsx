import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useTypedSelector } from '../hooks/useTypeSelector'
import { changePassword } from '../store/user/userAsyncActions'
import {
  ListItem,
  Form,
  Label,
  SaveButton,
  TextField,
  Wrapper,
  CancelButton,
  List,
} from './style'

export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const initialFields = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export const ChangePassword: React.FC = () => {
  const { user, errors, loading } = useTypedSelector((state) => state.user)
  const [fields, setFields] = useState<IChangePassword>(initialFields)
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const navigate = useNavigate()
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(changePassword({ fields, userId: user?._id }))
      .unwrap()
      .then(() => {
        setIsSuccess(true)
      })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess])

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        {errors && (
          <List>
            {errors.newPassword && <ListItem>{errors.newPassword}</ListItem>}
            {errors.oldPassword && <ListItem>{errors.oldPassword}</ListItem>}
            {errors.confirmPassword && (
              <ListItem>{errors.confirmPassword}</ListItem>
            )}
          </List>
        )}
        <Label htmlFor="oldPassword">Old Password</Label>
        <TextField
          onChange={onChange}
          name="oldPassword"
          value={fields.oldPassword}
          placeholder="Old password"
          type="password"
          onError={errors?.oldPassword}
        />
        <Label htmlFor="newPassword">New Password</Label>
        <TextField
          onChange={onChange}
          name="newPassword"
          value={fields.newPassword}
          placeholder="New Password"
          type="password"
          onError={errors?.newPassword}
        />
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <TextField
          onChange={onChange}
          name="confirmPassword"
          value={fields.confirmPassword}
          placeholder="Confirm New Password"
          type="password"
          onError={errors?.confirmPassword}
        />
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
