import React, { useEffect, useReducer } from "react";
import { AppContext } from "..";
import { parse, serialize } from "cookie";
import { useLocation } from "react-router-dom";

const AppContextProvider = ({ children }) => {
  const initialValue = {
    data: [],
    filteredData: [],
    status: "idle",
    filterBy: {
      gender: "all",
      age: "all",
      date: {
        from: "all",
        to: "all",
      },
    },
  };

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "FETCH_DATA_LOADING": {
        return { ...state, status: "loading" };
      }

      case "FETCH_DATA_SUCCESS": {
        return {
          ...state,
          filteredData: action.payload,
          data: action.payload,
          status: "idle",
        };
      }

      case "SET_FILTERED_DATA": {
        return {
          ...state,
          filteredData: action.payload,
          status: "idle",
        };
      }

      case "SET_FILTER_ACTIVE": {
        if (action.payload.filterBy === "gender") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              gender: action.payload.filterValue,
            },
          };
        }

        if (action.payload.filterBy === "age") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              age: action.payload.filterValue,
            },
          };
        }

        if (action.payload.filterBy === "date-from") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              date: {
                ...state.filterBy.date,
                from: action.payload.filterValue,
              },
            },
          };
        }

        if (action.payload.filterBy === "date-to") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              date: {
                ...state.filterBy.date,
                to: action.payload.filterValue,
              },
            },
          };
        }

        break;
      }

      case "CLEAR_FILTERS": {
        return {
          ...state,
          filterBy: {
            gender: "all",
            age: "all",
            date: {
              from: "all",
              to: "all",
            },
          },
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);
  const location = useLocation();

  useEffect(() => {
    const setFiltersFromURL = () => {
      const urlSearchParams = new URLSearchParams(location.search);
      const filterParams = urlSearchParams.get("filters");

      if (filterParams) {
        dispatch({
          type: "SET_FILTER_ACTIVE",
          payload: JSON.parse(filterParams),
        });
      }
    };

    setFiltersFromURL();
  }, [location.search, dispatch]);

  const generateShareableURL = () => {
    const filterParams = JSON.stringify(state.filterBy);
    const newURL = `${window.location.pathname}?filters=${filterParams}`;

    navigator.clipboard.writeText(newURL).then(() => {
      console.log('URL copied to clipboard:', newURL);
    }).catch((err) => {
      console.error('Failed to copy URL to clipboard:', err);
    });

    
  };

  useEffect(() => {
    const setPreferencesInCookies = () => {
      const cookieState = JSON.stringify(state.filterBy);

      document.cookie = `filterBy=${cookieState}`;

      const storedFilterBy = document.cookie.filterBy;
      if (storedFilterBy) {
        dispatch({
          type: "SET_FILTER_ACTIVE",
          payload: JSON.parse(storedFilterBy),
        });
      }
    };

    setPreferencesInCookies();
  }, [
    state.filterBy.gender,
    state.filterBy.age,
    state.filterBy.date.from,
    state.filterBy.date.to,
  ]);

  function convertExcelSerialNumberToJSDate(serialNumber) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const excelStartDate = new Date("1900-01-01T00:00:00Z");
    const offsetDays = serialNumber - 1;

    const targetDate = new Date(
      excelStartDate.getTime() + offsetDays * millisecondsPerDay
    );

    return targetDate;
  }

  useEffect(() => {
    let result = [...state.data];
    if (state.filterBy.gender !== "all") {
      result = result.filter(({ Gender }) => {
        return Gender === state.filterBy.gender;
      });
    }

    if (state.filterBy.age !== "all") {
      result = result.filter(({ Age }) => {
        return Age === state.filterBy.age;
      });
    }

    if (state.filterBy.date.from !== "all") {
      const refDate = new Date(state.filterBy.date.from);

      result = result.filter(({ Day }) => {
        const currentDate = convertExcelSerialNumberToJSDate(Day);
        console.log(refDate, currentDate);
        return currentDate > refDate;
      });
    }

    if (state.filterBy.date.to !== "all") {
      const refDate = new Date(state.filterBy.date.to);

      result = result.filter(({ Day }) => {
        const currentDate = convertExcelSerialNumberToJSDate(Day);
        return currentDate < refDate;
      });
    }

    dispatch({ type: "SET_FILTERED_DATA", payload: result });
  }, [
    state.filterBy.gender,
    state.filterBy.age,
    state.filterBy.date.from,
    state.filterBy.date.to,
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch, generateShareableURL }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
