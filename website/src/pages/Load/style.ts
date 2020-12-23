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

export const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  margin-top: 5.911vh;
`
export const Description = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #000000;
  margin-top: 2.9556vh;
  width: 290px;
`