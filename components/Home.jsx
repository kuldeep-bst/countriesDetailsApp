import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { useState } from "react";
import useTheme from "../hooks/useTheme";

export default function Home() {
  const [isDark] = useTheme();
  const [query, setQuery] = useState("");
  const [reg, setReg] = useState("");

  return (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="search-filter-container">
          <SearchBar setQuery={setQuery} />
          <SelectMenu setReg={setReg} />
        </div>
        <CountriesList query={query} reg={reg} />
      </main>
    </>
  );
}
