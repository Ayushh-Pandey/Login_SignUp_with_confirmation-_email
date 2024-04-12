import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from "./components/Registration/Registration";
import Dashboard from "./components/Dashboard";
import Interests from "./components/Profile/UserInterests/Interests";
import Profile from "./components/Profile/Profile";
import DataProvider from './context/DataProvider';
import Login from './components/Registration/Login';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/interests' element={<Interests />} />
          <Route path='/dashboard' element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App;
