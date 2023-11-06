import './App.css'
import WelcomePage from './components/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import { AppBridge } from "./PhaserApp/AppBridge";

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
      </Routes>
      <AppBridge width={800} height={600} />
    </div>
  )
}

export default App;