const SearchName = ({ setDisplayName, setFilterName, persons }) => {
  const handleSearch = (event) => {
    if (event.target.value === "") setDisplayName(false);
    else {
      setDisplayName(true);
      setFilterName(event.target.value);
    }
  };

  const searchName = (name) => {
    const len = persons.length;

    const filteredInfo = persons.filter((person) => person.name === name);
    console.log(filteredInfo);
  };

  return <input type="text" onChange={handleSearch} />;
};

export default SearchName;
