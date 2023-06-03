import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import {fetchCities} from "../api/Api";

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '60%',
        margin: '0 auto',
        marginTop: '20px',
        marginBottom: '20px',
        backgroundColor: '#f4f4f4',
        borderColor: '#666',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)',
        '&:hover': {
            borderColor: '#888',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#666',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#eee' : 'white',
        color: state.isFocused ? '#333' : '#666',
        '&:active': {
            backgroundColor: '#ddd',
        },
    }),
};
const Search = ({ onSearchChange }) => {
    const [searchValue, setSearchValue] = useState(null);

    const loadOptions = async (inputValue) => {
        const citiesList = await fetchCities(inputValue);

        return {
            options: citiesList.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                };
            }),
        };
    };

    const onChangeHandler = (enteredData) => {
        setSearchValue(enteredData);
        onSearchChange(enteredData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for cities"
            debounceTimeout={600}
            value={searchValue}
            onChange={onChangeHandler}
            loadOptions={loadOptions}
            styles={customStyles}
        />
    );
};

export default Search;