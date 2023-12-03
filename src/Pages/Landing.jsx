import React, { useContext, useState } from "react";

import { AppContext } from "..";
import Filterbar from "../Components/Filters/Filterbar";
import BarChart from "../Components/Charts/BarChart";
import LineChart from "../Components/Charts/LineChart";
import { toast } from "react-toastify";

const Landing = () => {
  const [selectedCategory, setSelectedCategory] = useState("A");

  const { state, generateShareableURL } = useContext(AppContext);

  const handleShareButtonClick = () => {
    generateShareableURL();
    toast.success("URL copied to clipboard");
  };
  return (
    <div className="main-page">
      <Filterbar />
      <button onClick={handleShareButtonClick} className="btn-clear mt-10">
        Share Chart
      </button>
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
