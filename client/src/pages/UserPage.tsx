import { useTypedSelector } from '../hooks/useTypeSelector'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import setAuthToken from '../utils/setAuthToken'
import { logOut } from '../store/user/userSlice'
import { Button } from '../styles/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100svh;
`
const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-end;
  justify-content: space-between;
  background-color: #f9f0f0;
  width: 800px;
  /* height: 325px; */
  border-radius: 20px;
`

const UserHeader = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 35px 0%;
  /* justify-content: center; */
  /* text-align: center; */
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  /* position: relative; */
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));
`

const Avatar = styled.img`
  /* margin: 0 auto; */
  /* text-align: center; */
  width: 169px;
  height: 169px;
  border-radius: 50%;
  top: 60px;
  left: 50%;
  margin-left: -84.5px;
  /* transform: translateY(50%); */
  position: absolute;
  /* margin: 0 auto; */
  /* text-align: center; */
  /* margin: 0 auto; */
  /* position: absolute; */
  /* right: 50%; */
  /* right: 50%; */
`

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`

const AvatarWrapper = styled.div`
  /* text-align: center; */
  /* justify: center; */
  /* align-self: flex-end; */
  /* text-align: center; */
  top: 20px;
  right: 50%;
  margin-right: -50px;
  /* transform: translateY(50%); */
  position: absolute;
`

const EditButton = styled(Button)`
  /* margin: 0; */
`
const LogoutButton = styled(Button)`
  margin: 0px 20px 20px 20px;
  background: #cb4444;
  &:hover {
    background: #c11d1d;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 120px;
  display: flex;
  align-items: center;
`

export const UserPage: React.FC = () => {
  const { user } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const logout = () => {
    setAuthToken(null)
    dispatch(logOut())
  }

  return (
    <Wrapper>
      <UserCard>
        <UserHeader>
          <UserData>
            <span>
              <b>Login:</b> {user?.login}
            </span>
            <span>
              <b>Email:</b> {user?.email}
            </span>
            <span>
              <b>Name:</b> {user?.firstName}
            </span>
            <span>
              <b>Last name:</b>
              {user?.lastName}
            </span>
          </UserData>
          <Avatar
            src={
              user?.avatar
                ? `http://localhost:8000/uploads/${user.avatar}`
                : require('../img/noAvatar.png')
            }
            alt="avatar"
          />
        </UserHeader>
        <ButtonWrapper>
          <Link to="edit">
            <EditButton>Edit profile</EditButton>
          </Link>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </ButtonWrapper>
      </UserCard>
    </Wrapper>
  )
}
