import React, { createContext, useContext, useState } from "react";


 export const CounterContext = createContext(10);

export default function CounterContextProvider({ children }) {
   const [counter, setCounter] = useState(10);
  
  return (

      <CounterContext.Provider value={{ counter, setCounter }}>
      {children}

      </CounterContext.Provider>


  );
}
