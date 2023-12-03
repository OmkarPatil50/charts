import { useContext, useEffect, useState } from 'react';
import './App.css';
import LineChart from './Components/Charts/LineChart';
import Filterbar from './Components/Filters/Filterbar';
import { AppContext } from '.';
import { Navbar } from './Components/Navbar/Navbar';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import BarChart from './Components/Charts/BarChart';

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(BarElement);




function App() {
  const { state, dispatch, generateShareableURL } = useContext(AppContext)

  console.log(generateShareableURL)

  const [selectedCategory, setSelectedCategory] = useState('A')

  const getData = async () => {
    try {
      const response = await fetch('https://moonshot.omkarpatil20.repl.co/data')
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: jsonResponse })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const handleShareButtonClick = () => {
    generateShareableURL();
  };


  return (
    <div className="App">
      <Navbar />
      <div className="main-page">
        <Filterbar />
        <button onClick={handleShareButtonClick}>Share Chart</button>
        <section className="charts-section">
          <BarChart data={state.filteredData} setSelectedCategory={setSelectedCategory} />
          <LineChart data={state.filteredData} selectedCategory={selectedCategory} />
        </section>
      </div>
    </div>
  );
}

export default App;
