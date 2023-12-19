import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { presistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* presistgate using data store in local storage */}
    <PersistGate persistor={presistor}loading={null}>
      <App />
    </PersistGate>
  </Provider>,
)
