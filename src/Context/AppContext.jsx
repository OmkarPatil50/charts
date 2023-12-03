import React, { useEffect, useReducer } from "react";
import { AppContext } from "..";

const AppContextProvider = ({ children }) => {
  const initialValue = {
    data: [],
    filteredData: [],
    status: "idle",
    filterBy: {
      intensity: "all",
      likelihood: "all",
      relevance: "all",
      year: "all",
      country: "all",
      topic: "all",
      region: "all",
      city: "all",
      sector: "all",
      pestle: "all",
      source: "all",
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
        if (action.payload.filterBy === "intensity") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              intensity: action.payload.filterValue,
            },
          };
        }
        if (action.payload.filterBy === "likelihood") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              likelihood: action.payload.filterValue,
            },
          };
        }
        if (action.payload.filterBy === "relevance") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              relevance: action.payload.filterValue,
            },
          };
        }
        if (action.payload.filterBy === "year") {
          return {
            ...state,
            filterBy: { ...state.filterBy, year: action.payload.filterValue },
          };
        }
        if (action.payload.filterBy === "country") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              country: action.payload.filterValue,
            },
          };
        }
        if (action.payload.filterBy === "topic") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              topic: action.payload.filterValue,
            },
          };
        }
        if (action.payload.filterBy === "region") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              region: action.payload.filterValue,
            },
          };
        }
        if (action.payload.filterBy === "sector") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              sector: action.payload.filterValue,
            },
          };
        }
        if (action.payload.filterBy === "pestle") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              pestle: action.payload.filterValue,
            },
          };
        }
        if (action.payload.filterBy === "source") {
          return {
            ...state,
            filterBy: {
              ...state.filterBy,
              source: action.payload.filterValue,
            },
          };
        }
        break;
      }

      case "CLEAR_FILTERS": {
        return {
          ...state,
          filterBy: {
            intensity: "all",
            likelihood: "all",
            relevance: "all",
            year: "all",
            country: "all",
            topic: "all",
            region: "all",
            city: "all",
            sector: "all",
            pestle: "all",
            source: "all",
          },
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  useEffect(() => {
    let result = [...state.data];
    if (state.filterBy.intensity !== "all") {
      result = result.filter(
        ({ intensity }) =>
          parseFloat(intensity) >= parseFloat(state.filterBy.intensity)
      );
    }
    if (state.filterBy.likelihood !== "all") {
      result = result.filter(
        ({ likelihood }) =>
          parseFloat(likelihood) >= parseFloat(state.filterBy.likelihood)
      );
    }
    if (state.filterBy.relevance !== "all") {
      result = result.filter(
        ({ relevance }) =>
          parseFloat(relevance) >= parseFloat(state.filterBy.relevance)
      );
    }
    if (state.filterBy.year !== "all") {
      result = result.filter(
        ({ end_year }) =>
          parseFloat(end_year) === parseFloat(state.filterBy.year)
      );
    }
    if (state.filterBy.country !== "all") {
      result = result.filter(
        ({ country }) =>
          country.toLowerCase() === state.filterBy.country.toLowerCase()
      );
    }

    if (state.filterBy.topic !== "all") {
      result = result.filter(
        ({ topic }) =>
          topic.toLowerCase() === state.filterBy.topic.toLowerCase()
      );
    }

    if (state.filterBy.region !== "all") {
      result = result.filter(
        ({ region }) =>
          region.toLowerCase() === state.filterBy.region.toLowerCase()
      );
    }

    if (state.filterBy.sector !== "all") {
      result = result.filter(
        ({ sector }) =>
          sector.toLowerCase() === state.filterBy.sector.toLowerCase()
      );
    }

    if (state.filterBy.pestle !== "all") {
      result = result.filter(
        ({ pestle }) =>
          pestle.toLowerCase() === state.filterBy.pestle.toLowerCase()
      );
    }

    if (state.filterBy.source !== "all") {
      result = result.filter(
        ({ source }) =>
          source.toLowerCase() === state.filterBy.source.toLowerCase()
      );
    }
    dispatch({ type: "SET_FILTERED_DATA", payload: result });
  }, [
    state.filterBy.intensity,
    state.filterBy.likelihood,
    state.filterBy.relevance,
    state.filterBy.year,
    state.filterBy.country,
    state.filterBy.topic,
    state.filterBy.region,
    state.filterBy.sector,
    state.filterBy.pestle,
    state.filterBy.source,
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
