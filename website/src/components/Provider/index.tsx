import createSagaMiddleware from '@redux-saga/core'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as IntlProvider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from '../../store/reducers'
import saga from '../../store/sagas'
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(saga)

const Provider: React.FC = ({ children }) => {
  store.subscribe(() => {
  })

  return (
    <IntlProvider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
      </IntlProvider>
  )
}

export default Provider
