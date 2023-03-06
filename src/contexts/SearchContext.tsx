import React, { createContext, useContext, useState } from "react";
import { Dayjs } from "dayjs";

interface SearchState {
  query: string;
  yearRange: {
    startYear: Dayjs | null,
    endYear: Dayjs | null
  },
  page: number,
  pageSize: number
}

interface SearchContextProps {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

interface ProviderProps {
  children: any
}

const SearchContext = createContext<SearchContextProps>({
  searchState: { query: "", yearRange: { startYear: null, endYear: null }, page: 1, pageSize: 8 },
  setSearchState: () => { },
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    yearRange: {
      startYear: null,
      endYear: null
    },
    page: 1,
    pageSize: 8
  });

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
};