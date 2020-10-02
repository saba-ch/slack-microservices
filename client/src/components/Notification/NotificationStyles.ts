import styled from 'styled-components'

export const StyledContainer = styled.div<{ error?: boolean, shown: boolean }>`
  position: absolute;
  right: 10px;
  top: 40px;
  width: 300px;
  height: 50px;
  ${({ shown }) => !shown && 'display: none;'}
  background-color: ${({ error }) => error ? 'red' : 'green'};
`

export const StyledText = styled.p`

`