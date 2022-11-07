import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";
import MOCK_DATA from "../data/MOCK_DATA.json";

const initialState = {
    dashboards: MOCK_DATA["data"],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    function editDashboard(dashboard) {
        dispatch({
            type: "EDIT_DASHBOARD",
            payload: dashboard,
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                dashboards: state.dashboards,
                editDashboard,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}