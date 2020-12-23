export interface IValidatedInputField<T> {
    value: T
    isValid?: boolean
    error?: Error
  }
  
  export const emptyValidatedInputField: IValidatedInputField<any> = { value: null }
  