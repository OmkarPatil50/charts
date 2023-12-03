import React, { useContext, useState } from "react";

import { AppContext } from "..";
import Filterbar from "../Components/Filters/Filterbar";
import BarChart from "../Components/Charts/BarChart";
import LineChart from "../Components/Charts/LineChart";

const Landing = () => {
  const [selectedCategory, setSelectedCategory] = useState("A");

  const { state, generateShareableURL } = useContext(AppContext);

  const handleShareButtonClick = () => {
    generateShareableURL();
  };
  return (
    <div className="main-page">
      <Filterbar />
      <button onClick={handleShareButtonClick}>Share Chart</button>
      <section className="charts-section">
        <BarChart
          data={state.filteredData}
          setSelectedCategory={setSelectedCategory}
        />
        <LineChart
          data={state.filteredData}
          selectedCategory={selectedCategory}
        />
      </section>
    </div>
  );
};

export default Landing;
