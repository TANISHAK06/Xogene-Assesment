//https://github.com/TANISHAK06/Xogene-Assesment
// getDrugs would be used for fetching drugs details

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [debounceTime, setDebouncetime] = useState(null);

  // For fetching drugs by name
  const fetchDrugs = async (name) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${name}`
      );
      let drugs;
      if (response.data.drugGroup.conceptGroup) {
        drugs = response.data.drugGroup.conceptGroup[1].conceptProperties;
        console.log(drugs);
      } else {
        drugs = null;
        console.log(drugs);
      }

      if (drugs === null) {
        fetchSpellingSuggestions(name);
      } else {
        setResults(drugs);
        setSuggestions([]);
      }
    } catch (error) {
      setError("There is an error in fetching data");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // function for spell check
  const fetchSpellingSuggestions = async (name) => {
    try {
      const suggestionResponse = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${name}`
      );
      const suggestedNames =
        suggestionResponse.data.suggestionGroup.suggestionList?.suggestion ||
        [];
      if (suggestedNames.length > 0) {
        setSuggestions(suggestedNames);
      } else {
        setError("No suggestion is there kindly check the spelling ");
        setSuggestions([]);
      }
    } catch (error) {
      setError("Error in fetching Suggestion Data");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTime) clearTimeout(debounceTime);

    if (value.length >= 3) {
      //fetch function would be called if input has arleast 3 char
      const newTimeout = setTimeout(() => {
        fetchDrugs(value);
      }, 500);
      setDebouncetime(newTimeout);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (id) => {
    navigate(`/drugs/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Search for the specified drug
          </h2>
          <input
            type="text"
            placeholder="Type to Search...."
            value={query}
            onChange={handleSearch}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg transition-shadow"
          />
          {/* For Loading */}
          {loading && (
            <div className="flex justify-centre mt-4">
              <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin">
                {" "}
              </div>
            </div>
          )}
          {error && <div className="text-red-500 text-center mt-4"> </div>}
          {!loading && results.length > 0 && (
            <ul className="mt-4 space-y-2 bg-white rounded-lg shadow-md max-h-64 overflow-auto">
              {results.map((drug) => {
                <li
                  key={drug.rxcui}
                  onClick={() => handleSelect(drug.rxcui)}
                  className="p-4 bg-blue-50 hover:bg-blue-10 rounded-lg text-centre cursor cursor-pointer transition duration-200"
                >
                  {drug.name}
                </li>;
              })}
            </ul>
          )}
          {!loading && results.length === 0 && suggestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-200 mb-3">
                Did You Want to Search For This :
              </h3>
              <ul className="space-y-2 bg-white rounded-lg shadow-md max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => {
                  <li
                    key={index}
                    onClick={() => {
                      setQuery(suggestion);
                      setSuggestions([]);
                    }}
                    className="p-4 bg-blue-50 hover:bg-blue-10 rounded-lg text-centre cursor cursor-pointer transition duration-200"
                  >
                    {suggestion}
                  </li>;
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
