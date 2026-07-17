import React from "react";
import "./FilterModal.css";

const FilterModal = ({
  isOpen,
  onClose,
  applyFilters,
  tempFilters,
  setTempFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal__container"
    >
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal__close--btn"
          onClick={onClose}
        >
          ✖
        </button>
        <h2>Filters</h2>
        <div className="filter__list">
          <div className="spell__schools">
            <label className="title">Spell School: </label>
            <select
              value={tempFilters.school}
              onChange={(event) =>
                setTempFilters((prev) => ({
                  ...prev,
                  school: event.target.value,
                }))
              }
            >
              {[
                "All",
                "abjuration",
                "conjuration",
                "divination",
                "enchantment",
                "evocation",
                "illusion",
                "necromancy",
                "transmutation",
              ].map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>
          <div className="concentration">
            <label className="title">Concentration: </label>
            <div className="radio__btns">
                {["Required", "Not required"].map((option) => (
              <label 
              key={option}
              className="filter__option"
              >
                <input 
                type="radio" 
                className="concentration" 
                value={option} 
                checked={tempFilters.concentration === option}
                onChange={(event) =>
                    setTempFilters((prev) => ({
                    ...prev,
                    concentration: event.target.value,
                }))
                }/>
                {option}
              </label>
                ))}
              </div>
          </div>
          <div className="ritual">
            <label className="title">Ritual: </label>
            <div className="radio__btns">
                {["Required", "Not required"].map((option) => (
              <label 
              key={option}
              className="filter__option"
              >
                <input 
                type="radio" 
                className="ritual" 
                value={option}
                checked={tempFilters.ritual === option}
                onChange={(event) =>
                    setTempFilters((prev) => ({
                    ...prev,
                    ritual: event.target.value,
            })) 
                }/>
                {option}
              </label>
              ))}
              </div>
          </div>
          <div className="upcasting">
            <label className="title">UpCasting: </label>
            <div className="upcasting__btns">
                {["Available", "Not available"].map((option) => (
              <label 
              key={option}
              className="filter__option"
              >
                <input 
                type="radio" 
                className="upCasting" 
                value={option} 
                checked={tempFilters.upCasting === option}
                onChange={(event) =>
                    setTempFilters((prev) => ({
                    ...prev,
                    upCasting: event.target.value,
            })) 
                }/>
                {option}
              </label>
              ))}
            </div>
          </div>
          <div className="action">
            <label className="title">Action Type: </label>
            <div className="action__btns">
                {["Action", "Bonus Action", "Reaction"].map((option) => (
              <label 
              key={option}
              className="filter__option"
              >
                <input 
                type="radio" 
                className="action" 
                value={option} 
                checked={tempFilters.action === option}
                 onChange={(event) =>
                    setTempFilters((prev) => ({
                    ...prev,
                    action: event.target.value,
            })) 
                }/>
                {option}
              </label>
              ))}
            </div>
          </div>
          <div className="source">
            <label className="title">Source: </label>
            <div className="source__btns">
                {["Player's Handbook (2024)", "Humblewood"].map((option) => (
              <label 
              key={option}
              className="filter__option"
              >
                <input
                  type="radio"
                  className="source"
                  value={option}
                checked={tempFilters.source === option}
                 onChange={(event) =>
                    setTempFilters((prev) => ({
                    ...prev,
                    source: event.target.value,
            })) 
                }/>
                {option}
              </label>
              ))}
            </div>
          </div>
          <button 
          onClick={applyFilters}
          className="apply__btn"
          >
          Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
