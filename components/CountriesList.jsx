import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import HomePageShimmer from "./HomePageShimmer";

export default function CountriesContainer({ query, reg }) {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let prom = await fetch("https://restcountries.com/v3.1/all");
      const data = await prom.json();
      setCountriesData(data);
    }
    fetchData();
  }, []);

  // console.log(countriesData);
  console.log(reg);

  if (!countriesData.length) {
    return <HomePageShimmer />;
  }
  return (
    <div className="countries-container">
      {countriesData
        .filter(
          (data) =>
            (data.name.common.toLowerCase().includes(query) ||
              data.region.toLowerCase().includes(query)) &&
            data.region.includes(reg)
        )
        .map((country) => {
          return (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population}
              region={country.region}
              capital={country.capital?.[0]}
              data={country}
            />
          );
        })}
    </div>
  );
}
