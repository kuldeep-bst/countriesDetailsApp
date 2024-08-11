import { useEffect, useState } from "react";
import "./countryDetails.css";
import CountryPageShimmer from "./CountryPageShimmer";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function CountryDetail({}) {
  const { state } = useLocation();
  const [isDark] = useTheme();

  const param = useParams();
  const countryName = param.country;
  const [countryData, setCountryData] = useState(null);
  const [countryNotFount, setCountryNotFound] = useState(false);

  function setCountriesData(data) {
    setCountryData({
      name: data.name.common,
      flag: data.flags.svg,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital || []?.map((cap) => cap).join(", "),
      tld: data.tld[0],
      currencies: Object.values(data.currencies || [])
        .map((curr) => curr.name)
        .join(", "),
      languages: Object.values(data.languages || {})?.join(", "),
      borderCounrtries: [],
    });
    if (!data.borders) data.borders = [];
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([data]) => data.name.common);
      })
    ).then((res) => {
      setTimeout(() => {
        setCountryData((prevState) => ({
          ...prevState,
          borderCounrtries: res,
        }));
      });
    });
  }

  useEffect(() => {
    if (state != null) {
      setCountriesData(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fulltext=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountriesData(data);
      })
      .catch((err) => {
        setCountryNotFound(true);
      });
  }, [countryName]);

  if (countryNotFount) return <h1>Country not found!!</h1>;

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span onClick={() => history.back()} className="back-button">
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {!countryData ? (
          <CountryPageShimmer />
        ) : (
          <div className="country-details">
            {" "}
            <img src={countryData.flag} alt={`${countryData.name} flag`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>
                    Native Name: {countryData.nativeName || countryData.name}
                  </b>
                  <span className="native-name"></span>
                </p>
                <p>
                  <b>
                    Population: {countryData.population.toLocaleString("en-IN")}
                  </b>
                  <span className="population"></span>
                </p>
                <p>
                  <b>Region: {countryData.region}</b>
                  <span className="region"></span>
                </p>
                <p>
                  <b>Sub Region: {countryData.subregion}</b>
                  <span className="sub-region"></span>
                </p>
                <p>
                  <b>Capital: {countryData.capital}</b>
                  <span className="capital"></span>
                </p>
                <p>
                  <b>Top Level Domain: {countryData.tld}</b>
                  <span className="top-level-domain"></span>
                </p>
                <p>
                  <b>Currencies: {countryData.currencies}</b>
                  <span className="currencies"></span>
                </p>
                <p>
                  <b>Languages: {countryData.languages}</b>
                  <span className="languages"></span>
                </p>
              </div>
              {countryData.borderCounrtries.length != 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borderCounrtries.map((border) => {
                    return (
                      <Link to={`/${border}`} key={border}>
                        {border}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>{" "}
          </div>
        )}
      </div>
    </main>
  );
}
