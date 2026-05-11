import './App.css'
import Header from './components/Header/Header'
import { Outlet } from 'react-router'

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App