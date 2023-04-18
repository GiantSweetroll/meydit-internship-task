import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const [selectedJobDetails, setSelectedJobDetails] = useState(JSON.parse(localStorage.getItem('selectedJob')) ?? {})
    const [clothingTypes, setClothingTypes] = useState([])
    const [statusTypes, setStatusTypes] = useState([])

    return (
        <StateContext.Provider
            value = {{
                selectedJobDetails, setSelectedJobDetails,
                clothingTypes, setClothingTypes,
                statusTypes, setStatusTypes
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);