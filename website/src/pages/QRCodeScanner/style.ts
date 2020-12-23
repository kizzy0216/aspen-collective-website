import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  position: relative !important;
  z-index: 2;
  opacity: 1;
  width: 100%;
  align-items: center;
`

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #afaca9;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80px;
  min-height: 80px;
  background-color: #afaca9;
`

export const Text = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
`
export const CloseButton = styled.div`
  display: flex;
  flex-column: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2.955vh;
  left: 6.4%;
  width: auto;
`