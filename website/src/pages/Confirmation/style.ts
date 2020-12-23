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
  background-image: url(${(props: any) => props.backgroundImage ? props.backgroundImage : 'none'});
  opacity: 1;
  width: 100%;
  align-items: center;
`
export const BottomContainer = styled.div`
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
  bottom: 14.285vh;
`
export const Question = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  margin-top: 14.285vh;
  margin-bottom: 4.064vh;
  width: 100%;
`
export const UTEContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const UTEInput = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  max-width: 300px;
  width: 100%;
  border: none;
  outline: none;
  color: #333333;
`
export const DisabledText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #828282;
`

export const TextMedium = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
`

export const TextSmall = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #000000;
  margin-bottom: 2.9556vh;
`