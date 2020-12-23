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

export const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  margin-top: 9.852vh;
  max-width: 300px;
  margin-bottom: 4.187vh;
`

export const H1 = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
`

export const H2 = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 30px;
  color: #000000;

  @media (max-width: 360px){
    font-size: 12px;
  }
`
export const AddressContainer = styled.div`
  display: flex;
  flex-column: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`
export const CloseButton = styled.div`
  display: flex;
  flex-column: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2.955vh;
  right: 6.4%;
  width: auto;
`