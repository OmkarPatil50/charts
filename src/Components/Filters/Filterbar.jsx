import React, { useContext } from "react";
import { AppContext } from "../..";
import "./Filterbar.css";

const Filterbar = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="filterbar">
      <fieldset className="filter-bar-fieldset">
        <legend>Age</legend>
        <select
          name="age"
          id="age"
          value={state?.filterBy?.age}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "age",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all" disabled>
            Select Age
          </option>
          <option value="15-25">15-25</option>
          <option value=">25">More than 25</option>
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Gender</legend>
        <select
          name="gender"
          id="gender"
          value={state?.filterBy?.gender}
          onChange={(event) => {
            dispatch({
              type: "SET_FILTER_ACTIVE",
              payload: {
                filterBy: "gender",
                filterValue: event.target.value,
              },
            });
          }}
        >
          <option value="all" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </fieldset>

      <fieldset className="filter-bar-fieldset">
        <legend>Time Range</legend>
        <label htmlFor="from">
          <input
            type="date"
            id="from"
            value={state.filterBy.date.from}
            onChange={(event) => {
              dispatch({
                type: "SET_FILTER_ACTIVE",
                payload: {
                  filterBy: "date-from",
                  filterValue: event.target.value,
                },
              });
            }}
          />
        </label>
        <label htmlFor="to">
          <input
            type="date"
            id="to"
            value={state.filterBy.date.to}
            onChange={(event) => {
              dispatch({
                type: "SET_FILTER_ACTIVE",
                payload: {
                  filterBy: "date-to",
                  filterValue: event.target.value,
                },
              });
            }}
          />
        </label>
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
