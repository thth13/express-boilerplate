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
  border-radius: 20px;
`

const UserHeader = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 35px 0%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));
`

const Avatar = styled.img`
  width: 169px;
  height: 169px;
  border-radius: 50%;
  top: 60px;
  left: 50%;
  margin-left: -84.5px;
  position: absolute;
`

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
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
const UserField = styled.div`
  display: flex;
  align-items: center;
`

const Skeleton = styled.div<{ width?: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #ececec;
`

const AvatarSkeleton = styled.div`
  width: 169px;
  height: 169px;
  border-radius: 50%;
  top: 60px;
  left: 50%;
  margin-left: -84.5px;
  position: absolute;
  background-color: #ececec;
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
            <UserField>
              <b>Login:</b>
              {user ? (
                <span>{user?.login}</span>
              ) : (
                <Skeleton width={70} height={15} />
              )}
            </UserField>
            <UserField>
              <b>Email:</b>
              {user ? (
                <span>{user?.email}</span>
              ) : (
                <Skeleton width={80} height={15} />
              )}
            </UserField>
            <UserField>
              <b>Name:</b>
              {user ? (
                <span>{user?.firstName}</span>
              ) : (
                <Skeleton width={95} height={15} />
              )}
            </UserField>
            <UserField>
              <b>Last Name:</b>
              {user ? (
                <span>{user?.lastName}</span>
              ) : (
                <Skeleton width={85} height={15} />
              )}
            </UserField>
          </UserData>
          {user ? (
            <Avatar
              src={
                user?.avatar
                  ? `http://localhost:8000/uploads/${user.avatar}`
                  : require('../img/noAvatar.png')
              }
              // alt="avatar"
            />
          ) : (
            <AvatarSkeleton />
          )}
        </UserHeader>
        <ButtonWrapper>
          <Link to="edit">
            <Button>Edit profile</Button>
          </Link>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </ButtonWrapper>
      </UserCard>
    </Wrapper>
  )
}
