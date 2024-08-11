import React from "react";

export default function SelectMenu({ setReg }) {
  return (
    <select
      className="filter-by-region"
      onChange={(e) => setReg(e.target.value)}
    >
      <option value="">Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="Americas">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}
