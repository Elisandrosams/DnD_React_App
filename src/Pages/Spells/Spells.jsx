import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Spells.css";
import data from "../../Assets/Spelldata/spells.json";
import SpellSlider from "../../Components/SpellSlider/SpellSlider.jsx";
import FilterModal from "../../Components/FilterModal/FilterModal.jsx";
import { Link } from "react-router-dom";

function ClearButton({ onClear, show }) {
  if (!show) return null;
  return (
    <button
      onClick={onClear}
      style={{
        marginLeft: "5px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        color: "black",
      }}
      aria-label="Clear filter"
    >
      ✖
    </button>
  );
}

const Spells = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    school: "All",
    concentration: "",
    ritual: "",
    range: [0, 9],
    searchTerm: "",
    classFilter: "All",
    sortBy: "LOW_TO_HIGH",
  });
  const [tempFilters, setTempFilters] = useState(filters);
  const [filteredSpells, setFilteredSpells] = useState([]);

  const formatValue = (value) => {
    const num = Number(value);
    if (num === 0) return "Cantrip";
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };
  useEffect(() => {
    const results = data.filter((spell) => {
      const levelNum = Number(spell.level);
      const matchesLevel =
        levelNum >= filters.range[0] && levelNum <= filters.range[1];
      const matchesSearch = spell.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const matchesClass =
        filters.classFilter === "All" ||
        spell.classes.includes(filters.classFilter);
      const matchesSchool =
        filters.school === "All" || spell.school === filters.school;
      const matchesConcentration =
        !filters.concentration ||
        (filters.concentration === "Required" &&
          spell.concentration === true) ||
        (filters.concentration === "Not required" &&
          spell.concentration === false);
      const matchesRitual =
        !filters.ritual ||
        (filters.ritual === "Required" && spell.ritual === true) ||
        (filters.ritual === "Not required" && spell.ritual === false);
      const matchesUpCasting =
        !filters.upCasting ||
        (filters.upCasting === "Available" && Boolean(spell.higherLevelSlot)) ||
        (filters.upCasting === "Not available" &&
          (spell.higherLevelSlot === false || spell.higherLevelSlot == null));
      const matchesAction =
        !filters.action ||
        (filters.action === "Action" &&
          spell.actionType === "action") ||
        (filters.action === "Bonus Action" &&
          spell.actionType === "bonusAction") ||
        (filters.action === "Reaction" &&
          spell.actionType === "reaction");
      const matchesSource =
        !filters.source ||
        (filters.source === "Player's Handbook (2024)" && spell.source === "Player's Handbook (2024)") ||
        (filters.source === "Humblewood" && spell.source === "Humblewood");

      return (
        matchesLevel &&
        matchesSearch &&
        matchesClass &&
        matchesSchool &&
        matchesConcentration &&
        matchesRitual &&
        matchesUpCasting &&
        matchesAction &&
        matchesSource
      );
    });
    const sortedResults = [...results].sort((a, b) => {
      if (filters.sortBy === "NAME") {
        return a.name.localeCompare(b.name);
      } else if (filters.sortBy === "LOW_TO_HIGH") {
        return Number(a.level) - Number(b.level);
      } else if (filters.sortBy === "HIGH_TO_LOW") {
        return Number(b.level) - Number(a.level);
      }
      return 0;
    });
    setFilteredSpells(sortedResults);
  }, [filters]);

  const applyFilters = () => {
    setFilters(tempFilters);
    setIsModalOpen(false);
  };

  const excludedKeys = ["range", "sortBy", "searchTerm", "classFilter"];

  const clearFilter = (key) => {
    if (excludedKeys.includes(key)) return;
    setFilters((prev) => ({
      ...prev,
      [key]: key === "school" ? "All" : "" 
    }));
  };
  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (excludedKeys.includes(key)) return false;
    return value && !(key === "school" && value === "All");
  });


  return (
    <div>
      <Navbar />
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applyFilters={applyFilters}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
      />
      <div className="spell__search--container">
        <div id="about" className="about">
          <h1>About</h1>
          <p className="about__info">
            This page was created to quickly look up spells and what they do
            while DMing for my kids.
            <br />
            Includes all DnD 5E 2024 spells and the twenty spells from the
            Humblewood campaigns.
          </p>
        </div>
        <div className="spell__search-filters--container">
          <div className="search__container">
            <label htmlFor="searchInput">Name:</label>
            <input
              type="text"
              id="searchInput"
              placeholder="Search spells"
              value={filters.searchTerm}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  searchTerm: event.target.value,
                }))
              }
            />
            <ClearButton
              onClear={() =>
                setFilters((prev) => ({ ...prev, searchTerm: "" }))
              }
              show={filters.searchTerm !== ""}
            />
          </div>
          <div className="slider__container">
            <SpellSlider
              range={filters.range}
              setRange={(newRange) =>
                setFilters((prev) => ({
                  ...prev,
                  range: newRange,
                }))
              }
            />
            <ClearButton
              onClear={() => setFilters((prev) => ({ ...prev, range: [0, 9] }))}
              show={filters.range[0] !== 0 || filters.range[1] !== 9}
            />
          </div>
          <div className="class__filter">
            <label htmlFor="searchInput">Class:</label>
            <select
              id="searchInput"
              value={filters.classFilter}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  classFilter: event.target.value,
                }))
              }
            >
              <option value="All">All</option>
              <option value="bard">Bard</option>
              <option value="cleric">Cleric</option>
              <option value="druid">Druid</option>
              <option value="paladin">Paladin</option>
              <option value="ranger">Ranger</option>
              <option value="sorcerer">Sorcerer</option>
              <option value="warlock">Warlock</option>
              <option value="wizard">Wizard</option>
            </select>
            <ClearButton
              onClear={() =>
                setFilters((prev) => ({ ...prev, classFilter: "All" }))
              }
              show={filters.classFilter !== "All"}
            />
          </div>
          <div className="further__filter">
            <button
              className="filter__btn"
              onClick={() => setIsModalOpen(true)}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <line
                  x1="4"
                  y1="6"
                  x2="20"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                ></line>
                <circle
                  className="slider-1"
                  cx="9"
                  cy="6"
                  r="2"
                  fill="currentColor"
                ></circle>
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                ></line>
                <circle
                  className="slider-2"
                  cx="15"
                  cy="12"
                  r="2"
                  fill="currentColor"
                ></circle>
                <line
                  x1="4"
                  y1="18"
                  x2="20"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                ></line>
                <circle
                  className="slider-3"
                  cx="12"
                  cy="18"
                  r="2"
                  fill="currentColor"
                ></circle>
              </svg>
            </button>
          </div>
        </div>
        {activeFilters.length > 0 && (
        <div className="filter__box">
          {activeFilters.map(([key, value]) => (
          <div key={key} className="filter__chips">
            <span>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</span>
            <button
              className="clearchip__btn"
              onClick={() => clearFilter(key)}
              >
              ×
            </button>
          </div>
        ))}
        </div> )}
        <div className="filter__container">
          <p>
            {filteredSpells.length === 0
              ? "No spells found, please adjust your filters"
              : filteredSpells.length}
            {filteredSpells.length > 0 ? " Spells" : ""}
          </p>
          <div className="filter">
            <select
              id="filter"
              value={filters.sortBy}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, sortBy: event.target.value }))
              }
            >
              <option value="Sort" disabled>
                Sort
              </option>
              <option value="LOW_TO_HIGH">Level, Low to High</option>
              <option value="HIGH_TO_LOW">Level, High to Low</option>
              <option value="NAME">Name</option>
            </select>
          </div>
        </div>
      </div>
      <div className="spellList">
        {filteredSpells.length > 0
          ? filteredSpells.map((spell, name) => (
              <Link
              to={`/spell/${encodeURIComponent(spell.name)}`} 
              key={spell.name} 
              className="spellCard"
              >
                <h3>{spell.name}</h3>
                <div className="spellInfo">
                  <p>{formatValue(spell.level)}</p>
                  <p>{spell.school}</p>
                </div>
              </Link>
            ))
          : []}
      </div>

      <Footer />
    </div>
  );
};

export default Spells;
