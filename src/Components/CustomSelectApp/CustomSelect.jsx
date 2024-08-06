import React, { useState, useEffect, useRef } from "react";
import "./CustomSelect.css";
import Icons from "./Icons";

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [state, setState] = useState({
    isOpen: false,
    search: "",
    selectedValue: value || (isMulti ? [] : ""),
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (onMenuOpen && state.isOpen) {
      onMenuOpen();
    }
  }, [state.isOpen, onMenuOpen]);

  const handleClick = (option) => {
    const newValue = isMulti
      ? state.selectedValue.includes(option)
        ? state.selectedValue.filter((val) => val !== option)
        : [...state.selectedValue, option]
      : option;

    setState((prevState) => ({
      ...prevState,
      selectedValue: newValue,
      isOpen: !isMulti,
    }));

    onChangeHandler(newValue);
  };

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      selectedValue: isMulti ? [] : null,
      search: "",
    }));
  };

  const handleSearch = (e) => {
    const searchData = e.target.value;
    setState((prevState) => ({
      ...prevState,
      search: searchData,
    }));

    if (onSearchHandler) {
      onSearchHandler(searchData);
    }
  };

  const filteredOptions = options
    .map((option) => {
      if (isGrouped) {
        const filteredSubOptions = option.options.filter((opt) =>
          opt.label.toLowerCase().includes(state.search.toLowerCase())
        );

        return {
          ...option,
          options: filteredSubOptions,
        };
      }

      return option.label.toLowerCase().includes(state.search.toLowerCase())
        ? option
        : null;
    })
    .filter((option) => option && (!isGrouped || option.options.length > 0));

  return (
    <div className={`kzui-select ${isDisabled ? "kzui-select--disabled" : ""}`}>
      <h2 className="heading">Selectify Custom Select</h2>
      <div
        className="kzui-select__control"
        onClick={() =>
          !isDisabled &&
          setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
        }
      >
        <div className="kzui-select__value">
          {isMulti ? (
            state.selectedValue.length > 0 ? (
              state.selectedValue.map((val) => (
                <div className="kzui-select__items" key={val.label}>
                  {val.label}
                  {isClearable && (
                    <span onClick={() => handleClick(val)}>
                      <Icons.Close />
                    </span>
                  )}
                </div>
              ))
            ) : (
              <span className="kzui-select__placeholder">{placeholder}</span>
            )
          ) : state.selectedValue ? (
            state.selectedValue.label
          ) : (
            <span className="kzui-select__placeholder">{placeholder}</span>
          )}
        </div>
        {isClearable && state.selectedValue && (
          <button className="kzui-select__clear" onClick={handleClear}>
            <Icons.Close />
          </button>
        )}
      </div>
      {state.isOpen && (
        <div className="kzui-select__menu">
          {isSearchable && (
            <input
              ref={inputRef}
              type="text"
              className="kzui-select__search"
              value={state.search}
              onChange={handleSearch}
              placeholder="Find your dream Phone & TWS"
            />
          )}
          <div className="kzui-select__options">
            {filteredOptions.map((option, index) =>
              isGrouped ? (
                <div key={index} className="kzui-select__group">
                  <div className="kzui-select__group-label">{option.label}</div>
                  {option.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className={`kzui-select__option ${
                        state.selectedValue.includes(opt)
                          ? "kzui-select__option--selected"
                          : ""
                      }`}
                      onClick={() => handleClick(opt)}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  key={option.value}
                  className={`kzui-select__option ${
                    state.selectedValue === option
                      ? "kzui-select__option--selected"
                      : ""
                  }`}
                  onClick={() => handleClick(option)}
                >
                  {option.label}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
