import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import Home from './pages/HomePage/index'
import LoginPage from './pages/LoginPage/index'
import Loading from './components/molecules/Loading'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  const [isLoggedInCtx, setIsLoggedInCtx] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) setIsLoggedInCtx(true);
  }, [isLoggedInCtx])

  setTimeout(() => {
    setIsLoading(false)
  }, 500)

  return (
    <BrowserRouter>
      {isLoading ? <Loading isLoading={true} /> :
        <AuthContext.Provider value={{ isLoggedInCtx: isLoggedInCtx, setIsLoggedInCtx: setIsLoggedInCtx }}>

          <Routes>
            {isLoggedInCtx ?
              <>
                <Route path="/" element={<Home />} />
                <Route path='*' element={<NotFoundPage />} />
              </>
              : (
                <>
                  <Route path="/" element={<LoginPage />} />
                </>
              )}
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </AuthContext.Provider>
      }
    </BrowserRouter >
  )
}

export default App