import { IBaseProps } from '@valudio/ui'
import React from 'react'
import Styled from './styles'

const Page: React.FC<IBaseProps> = ({ children, isHidden, style, className }) => {
  if (isHidden) return null

  return (
    <Styled style={ style } className={ className || '' } >
      { children }
    </Styled>
  )
}

export default Page
