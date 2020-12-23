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
  position: absolute;
  top: 0;
  z-index: 10;
  background-color: #fff;
  opacity: 1;
  width: 100%;
  align-items: center;
  transition: 0.5s;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`
export const Header = styled.div`
  display: flex;
  background: #163854;
  width: 100%;
  height: 48px;
  min-height: 48px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #FFFFFF;
  align-items: center;
  justify-content: center;
`
export const BackButton = styled.div`
  position: absolute;
  left: 7.2%;
`

export const ItemContainer = styled.div`
  width: 91.4667%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3.94vh;
`

export const Item = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  padding: 8px 0;
  border-bottom: 1px solid #E0E0E0;
`
export const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: left;
  color: #000000;
  margin-top: 1.97vh;
  justify-content: space-between;
  display: flex;
  align-items: center;

  @media (max-width: 360px){
    font-size: 14px;
  }
`
export const Value = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: left;
  margin-top: 0.985vh;
  color: #000000;

  @media (max-width: 360px){
    font-size: 12.5px;
  }
`
export const Description = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 12px;
  color: #333333;
  margin-top: 1.97vh;
`
export const Link = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #00A3FF;
  padding: 1.97vh 0;
  border-top: 1px solid #E0E0E0;
`

export const Copy = styled.span`
  display: flex;
  align-items: center;
  margin-left: 5px;
`

export const Separator  = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  margin-top: 2.463vh;
  width: 100%;
`
