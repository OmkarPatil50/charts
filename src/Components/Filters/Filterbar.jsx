import React, { useContext } from "react";
import { AppContext } from "../..";
import "./Filterbar.css";

const Filterbar = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="filterbar">
      <fieldset className="filter-bar-fieldset">
        <legend>End Year</legend>
        <select
          name="end_year"
          id="end_year"
          value={state.filterBy.year}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "year",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all">Select End Year</option>
          {state.data
            .map((item) => item.end_year)
            .reduce((acc, end_year) => {
              return acc.some((item) => item === end_year)
                ? acc
                : end_year
                ? [...acc, end_year]
                : acc;
            }, [])
            .sort((a, b) => a - b)
            .map((item) => {
              return <option>{item}</option>;
            })}
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Topic</legend>
        <select
          name="topic"
          id="topic"
          value={state.filterBy.topic}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "topic",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all">Select Topic</option>
          {state.data
            .map((item) => item.topic)
            .reduce((acc, topic) => {
              return acc.some((item) => item === topic)
                ? acc
                : topic
                ? [...acc, topic]
                : acc;
            }, [])
            .map((item) => {
              return <option>{item}</option>;
            })}
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Sector</legend>
        <select
          name="sector"
          id="sector"
          value={state.filterBy.sector}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "sector",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all">Select Sector</option>
          {state.data
            .map((item) => item.sector)
            .reduce((acc, sector) => {
              return acc.some((item) => item === sector)
                ? acc
                : sector
                ? [...acc, sector]
                : acc;
            }, [])
            .map((item) => {
              return <option>{item}</option>;
            })}
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Region</legend>
        <select
          name="region"
          id="region"
          value={state.filterBy.region}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "region",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all">Select Region</option>
          {state.data
            .map((item) => item.region)
            .reduce((acc, region) => {
              return acc.some((item) => item === region)
                ? acc
                : region
                ? [...acc, region]
                : acc;
            }, [])
            .map((item) => {
              return <option>{item}</option>;
            })}
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Pestle</legend>
        <select
          name="pestle"
          id="pestle"
          value={state.filterBy.pestle}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "pestle",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all">Select Pestle</option>
          {state.data
            .map((item) => item.pestle)
            .reduce((acc, pestle) => {
              return acc.some((item) => item === pestle)
                ? acc
                : pestle
                ? [...acc, pestle]
                : acc;
            }, [])
            .map((item) => {
              return <option>{item}</option>;
            })}
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Source</legend>
        <select
          name="source"
          id="source"
          value={state.filterBy.source}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "source",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all">Select Source</option>
          {state.data
            .map((item) => item.source)
            .reduce((acc, source) => {
              return acc.some((item) => item === source)
                ? acc
                : source
                ? [...acc, source]
                : acc;
            }, [])
            .map((item) => {
              return <option>{item}</option>;
            })}
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Country</legend>
        <select
          name="country"
          id="country"
          value={state.filterBy.country}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "country",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all">Select Country</option>
          {state.data
            .map((item) => item.country)
            .reduce((acc, country) => {
              return acc.some((item) => item === country)
                ? acc
                : country
                ? [...acc, country]
                : acc;
            }, [])
            .map((item) => {
              return <option>{item}</option>;
            })}
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Intensity</legend>
        <input
          type="number"
          placeholder="Intensity"
          value={
            state.filterBy.intensity === "all" ? "" : state.filterBy.intensity
          }
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "intensity",
                filterValue: event.target.value,
              },
            });
          }}
        />
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Likelihood</legend>
        <input
          type="number"
          placeholder="Likelihood"
          value={
            state.filterBy.likelihood === "all" ? "" : state.filterBy.likelihood
          }
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "likelihood",
                filterValue: event.target.value,
              },
            });
          }}
        />
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Relevance</legend>
        <input
          type="number"
          placeholder="Relevance"
          value={
            state.filterBy.relevance === "all" ? "" : state.filterBy.relevance
          }
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "relevance",
                filterValue: event.target.value,
              },
            });
          }}
        />
      </fieldset>

      <button
        className="btn-clear"
        onClick={() => {
          dispatch({ type: "CLEAR_FILTERS" });
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filterbar;
