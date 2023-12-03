import { useContext, useEffect } from 'react';
import './App.css';
import { AppContext } from '.';
import { Navbar } from './Components/Navbar/Navbar';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import { Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import { Login } from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import RequireAuth from './Pages/Auth/RequireAuth';
import { ToastContainer } from 'react-toastify';
import { Loading } from './Components/Loading/Loading';

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(BarElement);


function App() {
  const { state, dispatch } = useContext(AppContext)

  const getData = async () => {
    try {
      const response = await fetch('https://moonshot.omkarpatil20.repl.co/data')
      const jsonResponse = await response.json()
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: jsonResponse })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="App">
      {
        state.status ? <Loading /> : ''
      }
      <Navbar />
      <Routes>
        <Route path='/' element={
          <RequireAuth><Landing /></RequireAuth>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
