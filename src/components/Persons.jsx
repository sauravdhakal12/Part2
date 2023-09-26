import { deletePerson } from "../services/Services.jsx";

const DisplayPerson = ({ persons, reRender }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete user '${name}'?`)) {
      deletePerson(id).then((_) => reRender());
    }
  };

  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} : {person.number}{" "}
            <button
              onClick={() => {
                handleDelete(person.id, person.name);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayPerson;
