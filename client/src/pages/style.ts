import { Button } from '../styles/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ErrorMsg = styled.li`
  color: red;
  /* position: absolute; */
  /* margin-top: -10px; */
  /* margin-bottom: 15px; */
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100svh;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f9f0f0;
  padding: 50px 200px;
  border-radius: 20px;
`

export const Label = styled.label`
  margin-bottom: 5px;
`

export const TextField = styled.input`
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: #fff;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 287px;
  font-size: 16px;
  border-color: ${(props) => props.onError && 'red'};
  margin-bottom: 5px;
`

export const SaveButton = styled(Button)`
  margin-top: 5px;
  margin-bottom: 5px;
`

export const CancelButton = styled(SaveButton)`
  background: #cb4444;
  /* margin-bottom: 0; */
  width: 100%;
  &:hover {
    background: ${(props) => (props.disabled ? '#a8abb1' : '#CB1919')};
  }
`

export const PreloaderAvatar = styled.div`
  width: 169px;
  height: 169px;
  background-color: #cfcfcf;
  border-radius: 50%;
`

export const StyledLink = styled(Link)`
  color: #4472cb;
  cursor: pointer;
  font-size: 14px;
  color: black;
  margin: 5px auto;
  &:hover {
    color: #6883b9;
  }
`
export const List = styled.ul`
  padding-left: 20px;
  max-width: 287px;
`
export const ListItem = styled.li`
  color: red;
`
