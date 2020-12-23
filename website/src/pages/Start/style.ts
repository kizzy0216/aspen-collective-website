import styled from 'styled-components'

export const Background = styled.div<{ backgroundImage?: string }>`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  position: absolute !important;
  z-index: 1;
  background-image: url(${(props: any) => props.backgroundImage ? props.backgroundImage : 'none'});
  opacity: 1;
  width: 100%;
`
export const Container = styled.div<{ backgroundImage?: string }>`
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
  background-image: url(${(props: any) => props.backgroundImage ? props.backgroundImage : 'none'});
  opacity: 1;
  width: 100%;
  align-items: center;
`
export const BottomContainer = styled.div<{ backgroundImage?: string }>`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  height: auto;
  background-repeat: no-repeat;
  background-position: center bottom;
  position: absolute !important;
  z-index: 3;
  opacity: 1;
  width: 100%;
  align-items: center;
  bottom: 0;
`
export const Logo = styled.img`
  display: flex;
  width: 86px;
  cursor: pointer;
  margin-top: 63px;
`
export const LogoTextSmall = styled.div`
  display: flex;
  font-family: Times New Roman;
  font-style: Regular;
  font-size: 14px;
  align: center;
  color: #FFFFFF;
  margin-top: 17px;
`
export const LogoTextBig = styled.div`
  display: flex;
  font-family: Montserrat;
  font-style: Bold;
  font-size: 32px;
  line-height: 39px;
  align: center;
  color: #FFFFFF;
  margin-top: 60px;
`
export const LogoTextMedium = styled.div`
  display: flex;
  font-family: Montserrat;
  font-style: 500;
  Font size: 18px
  Line height: 22px
  align: center;
  color: #FFFFFF;
  margin-top: 14px;
`