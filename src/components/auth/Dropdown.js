import React, { useState, useEffect} from 'react';

function Dropdown({ options, onSelect, initialValue }) {
    const [selectedOption, setSelectedOption] = useState(initialValue || '');

    useEffect(() => {
      setSelectedOption(initialValue || '');
    }, [initialValue]);

    const handleSelect = (option) => {
      setSelectedOption(option);
      onSelect(option);
    };
  
    return (
      <select
        value={selectedOption}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

export default Dropdown
