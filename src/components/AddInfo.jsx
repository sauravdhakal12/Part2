import axios from "axios";
import { updateInfo } from "../services/Services";

const AddInfo = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  persons,
  setPersons,
  reRender,
  message,
  setMessage,
}) => {
  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const nameExists = () => {
    const len = persons.length;

    for (let i = 0; i < len; i++) {
      if (persons[i].name == newName) return persons[i].id;
    }

    return -1;
  };

  const successStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 20,
  };

  const handleAddName = (event) => {
		const updateName = nameExists();
    if (newName === "" || newNumber === "") {
      alert("Empty fields not allowed");
    } else if (updateName !== -1) {
      const replace = window.confirm(
        `Do you want to replace contact for '${newName}'`,
      );

      if (replace) {
        const updatedDetail = {
          name: newName,
          number: newNumber,
          id: updateName,
        };
        updateInfo(updatedDetail)
          .then((_) => {
            setMessage({
              message: "Successfully updated " + newName + "'s info",
              type: "success",
            });
            setTimeout(() => {
              setMessage({ message: null, type: null });
            }, 3000);
            reRender();
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setMessage({
              message: "User Already Deleted",
              type: "error",
            });
            setTimeout(() => {
              setMessage({ message: null, type: null });
            }, 3000);
            reRender();
          });
      }
    } else {
      const newList = {
        id: persons.length === 0 ? 1 : persons[persons.length - 1].id + 1,
        name: newName,
        number: newNumber,
      };

      axios.post("http://localhost:3001/api/persons", newList).then((response) => {
        setMessage({
          message: "Successfully added " + newName,
          type: "success",
        });
        setTimeout(() => {
          setMessage({ message: null, type: null });
        }, 3000);
        setNewName("");
        setNewNumber("");
        setPersons(persons.concat(response.data));
      });
    }
  };
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div>
        name: <input onChange={handleNoteChange} value={newName} /> <br />
        number:{" "}
        <input onChange={handleNumberChange} value={newNumber} type="number" />
      </div>
      <div>
        <button type="submit" onClick={handleAddName}>
          {" "}
          add
        </button>
      </div>
    </form>
  );
};

export default AddInfo;
