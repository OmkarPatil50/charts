import { useContext, useEffect, useState } from 'react';
import './App.css';
import IntensityChart from './Components/Charts/IntensityChart';
import RelevanceChart from './Components/Charts/RelevanceChart';
import YearChart from './Components/Charts/YearChart';
import CountryChart from './Components/Charts/CountryChart';
import TopicsChart from './Components/Charts/TopicsChart';
import RegionChart from './Components/Charts/RegionChart';
import LikelihoodChart from './Components/Charts/LikelihoodChart';
import Filterbar from './Components/Filters/Filterbar';
import { AppContext } from '.';
import { Navbar } from './Components/Navbar/Navbar';

function App() {
  const { state, dispatch } = useContext(AppContext)

  const getData = async () => {
    try {
      const response = await fetch('https://assignment-blackcoffeer.omkarpatil20.repl.co/data')
      const jsonResponse = await response.json()
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: jsonResponse.data })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div className="main-page">
        <Filterbar />
        <section className="charts-section">
          <IntensityChart data={state.filteredData} />
          <LikelihoodChart data={state.filteredData} />
          <RelevanceChart data={state.filteredData} />
          <YearChart data={state.filteredData} />
          <CountryChart data={state.filteredData} />
          <TopicsChart data={state.filteredData} />
          <RegionChart data={state.filteredData} />
        </section>
      </div>
    </div>
  );
}

export default App;
