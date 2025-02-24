import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import MainPage from './pages/MainPage'
import MoviePage from './pages/MoviePage'
import PrivateRoute from './components/PrivateRoute'
import UserPage from './pages/UserPage'
import {Route,Routes} from 'react-router'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Routes>
      <Route path='auth'>
        <Route path='login' element={<LoginForm />} />
        <Route path='registration' element={<RegistrationForm/>} />
      </Route>
      <Route path='cinema' element={<PrivateRoute />}>
      <Route path='movie/:movieId' element={<MoviePage></MoviePage>}/>
        <Route path='main' element={<MainPage>  </MainPage>} />
        <Route path="liked" element={<UserPage/>}/>
      </Route>
    </Routes>
     
    </>
  )
}

export default App
