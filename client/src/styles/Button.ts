import styled from 'styled-components'

export const Button = styled.button`
  background: ${(props) => (props.disabled ? '#a8abb1' : '#4472cb')};
  border-radius: 5px;
  /* background: #4472cb; */
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 50px;
  outline: none;
  border: none;
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.disabled ? '#a8abb1' : '#3663be')};
  }
`
