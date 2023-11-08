import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserNameProvider } from './contexts/UsernameContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(

  <UserNameProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </UserNameProvider>
  
)
