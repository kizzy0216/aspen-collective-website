import styled from 'styled-components'

export const TopDecoration = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  min-height: 39.9vh;
  height: 39.9vh;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  position: relative !important;
  z-index: 1;
  background-color: #163854;
  opacity: 1;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
`
export const SettingsButton = styled.div`
  position: absolute;
  z-index: 9;
  right: 7%;
  top: 3.57vh;

`
export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -36px;
  z-index: 9;
`

export const ButtonIcon = styled.img`
  display: flex;
`
export const TransactionContainer = styled.div`
  display: flex;
  text-align: left;
  width: 87.2%;
  margin-top: 4.926vh;
  flex-direction: column;
  overflow-y: hidden;
`
export const TransactionHistory = styled.div`
  display: flex;
  text-align: left;
  width: 100%;
  margin-top: 1.9704vh;
  flex-direction: column;
  overflow-y: auto;
`

export const Title = styled.div`
  display: flex;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.02em;
`
export const HintContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
`

export const Hint = styled.div`
  display: flex;
  text-align: left;
  margin-top: 4.43349vh;
  flex-direction: column;
`

export const Text = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`
export const DisabledText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #828282;
`
export const Link = styled.a`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #00A3FF;
  margin-top: 0.9852vh;
`

export const H1 = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: #FFFFFF;
  margin-left: 6.4%;
`

export const H2 = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 44px;
  color: #FFFFFF;
  margin-left: 6.4%;
`

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 4.43vh;
`

export const Info = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`
export const DateInfo = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  text-align: left;
  color: #828282;
`

export const Amount = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: #000000;
`