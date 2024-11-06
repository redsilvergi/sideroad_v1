import React, { createContext, useState, useContext, useCallback } from 'react';

const ViewStateContext = createContext();
const ViewUpdateContext = createContext();

const ViewProvider = ({ children }) => {
  const [view, setView] = useState({
    longitude: 128.05161672437677,
    latitude: 36.06497806027222,
    zoom: 6.5,
    bearing: 0,
    pitch: 0,
  });

  const setViewCallback = useCallback((newView) => {
    setView(newView);
  }, []);

  return (
    <ViewStateContext.Provider value={view}>
      <ViewUpdateContext.Provider value={setViewCallback}>
        {children}
      </ViewUpdateContext.Provider>
    </ViewStateContext.Provider>
  );
};

const useViewState = () => {
  const context = useContext(ViewStateContext);
  if (context === undefined) {
    throw new Error('useViewState must be used within a ViewProvider');
  }
  return context;
};

const useViewUpdate = () => {
  const context = useContext(ViewUpdateContext);
  if (context === undefined) {
    throw new Error('useViewUpdate must be used within a ViewProvider');
  }
  return context;
};

export { ViewProvider, useViewState, useViewUpdate };

// import {
//   createContext,
//   useState,
//   useMemo,
//   useContext,
//   useCallback,
// } from 'react';

// const ViewContext = createContext();

// const ViewProvider = ({ children }) => {
//   const [view, setView] = useState({
//     longitude: 128.05161672437677,
//     latitude: 36.06497806027222,
//     zoom: 6.5,
//     bearing: 0,
//     pitch: 0,
//   });

//   const setViewCallback = useCallback((newView) => {
//     setView(newView);
//   }, []);

//   const contextValue = useMemo(
//     () => ({
//       view,
//       setView: setViewCallback,
//     }),
//     [view, setViewCallback]
//   );

//   return (
//     <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>
//   );
// };

// const useView = () => {
//   return useContext(ViewContext);
// };

// export { ViewProvider, useView };
