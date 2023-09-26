import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

import DisplayPerson from "./components/Persons";
import AddInfo from "./components/AddInfo";
import SearchName from "./components/SearchName.jsx";
import DisplayMessage from "./components/Message.jsx";

import { fetchAll } from "./services/Services.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [displayName, setDisplayName] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState({ message: null, type: null });

  const reRender = () => {
    fetchAll().then((resposne) => setPersons(resposne));
  };

  useState(() => {
    reRender();
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <DisplayMessage message={message} />
      <AddInfo
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        reRender={reRender}
        message={message}
        setMessage={setMessage}
      />
      <br />
      <h2>Search</h2>
      <SearchName
        setDisplayName={setDisplayName}
        setFilterName={setFilterName}
        persons={persons}
      />
      <br /> <br />
      <h2>Numbers</h2>
      <DisplayPerson
        persons={
          displayName
            ? persons.filter((person) =>
                person.name.toLowerCase().match(filterName.toLowerCase()),
              )
            : persons
        }
        reRender={reRender}
      />
      <br />
    </div>
  );
};

export default App;
