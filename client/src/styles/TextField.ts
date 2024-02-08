import styled from 'styled-components'

export const TextField = styled.input`
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: #fff;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 287px;
  margin-bottom: 15px;
  font-size: 16px;
  border-color: ${(props) => props.onError && 'red'};
`
