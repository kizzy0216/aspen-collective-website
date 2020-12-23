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
  margin-top: 8.374vh;
  margin-bottom: 5.911vh;
  width: 250px;
`
export const UTEContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const UTELabel = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
`
export const UTEInput = styled.input`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  max-width: 300px;
  width: 100px;
  border: none;
  outline: none;
  color: #333333;
  background: transparent;
  ::placeholder {
    color: #BDBDBD;
    opacity: 1;
  };
`