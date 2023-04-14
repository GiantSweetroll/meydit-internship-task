import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const [selectedJobDetails, setSelectedJobDetails] = useState({})

    return (
        <StateContext.Provider
            value = {{
                selectedJobDetails, setSelectedJobDetails
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);