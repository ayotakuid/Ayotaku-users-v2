import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isValueSearch, setValueSearch] = useState({
    search: '',
  });

  return (
    <SearchContext.Provider value={{ isValueSearch, setValueSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext);