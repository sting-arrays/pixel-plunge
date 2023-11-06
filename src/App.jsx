import './App.css'
import WelcomePage from './components/WelcomePage';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
      </Routes>
    </div>
  )

}

export default App
