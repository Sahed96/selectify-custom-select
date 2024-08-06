import React, { useState } from "react";
import CustomSelect from "./Components/CustomSelectApp/CustomSelect.jsx";

const options = [
  {
    label: "Smartphone",
    options: [
      { label: "iPhone" },
      { label: "Samsung" },
      { label: "Google" },
      { label: "OnePlus" },
      { label: "Xiaomi" },
      { label: "Oppo" },
      { label: "Sony" },
      { label: "Nokia" },
      { label: "Asus" },
      { label: "Realme" },
    ],
  },
  {
    label: "Tws Buds",
    options: [
      { label: "AirPods" },
      { label: "SamsungBuds" },
      { label: "SonyXM4" },
      { label: "JabraElite" },
      { label: "AnkerAir" },
      { label: "PixelBuds" },
      { label: "Powerbeats" },
      { label: "JBL" },
    ],
  },
];

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <CustomSelect
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        options={options}
        value={selectedValue}
        placeholder="Select your favorite choice"
        isGrouped={true}
        isMulti={true}
        onChangeHandler={handleChange}
        onMenuOpen={() => console.log("Menu opened")}
        onSearchHandler={(search) => console.log("Search :", search)}
      />
    </div>
  );
};

export default App;
