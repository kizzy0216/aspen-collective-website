import { autobind } from 'core-decorators'
import React, { CSSProperties, PureComponent } from 'react'

interface IProps {
  icon: string
  onClick?: () => void
  className?: string
  isHidden?: boolean
  style?: CSSProperties
}

export default class Icon extends PureComponent<IProps> {
  public get src(): string {
    return `/assets/images/${ this.props.icon }`
  }

  private get className(): string {
    const className = this.props.className
    return `icon ${ className ? className : '' }`
  }

  public render() {
    const { isHidden, style } = this.props
    if (isHidden) return null
    return <img style={ style  }className={ this.className } onClick={ this.handleClick } src={ this.src } alt="icon" />
  }

  @autobind
  private handleClick(): void {
    const onClick = this.props.onClick
    if (onClick) onClick()
  }
}
