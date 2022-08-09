import React, { createContext, useContext, useReducer } from 'react';

//Prepare the Datalayer
export const DataLayerContext = createContext();

//wrap our app and provide the data laye

export const DataLayer = ({ reducer, initialState, children}) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
);

// pull info. from the data layer
export const useDataLayerValue = () => useContext(DataLayerContext);