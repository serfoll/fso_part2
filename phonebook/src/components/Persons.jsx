/** @format */

const Persons = ({ persons, filter }) => {
  const filteredPersons = (
    filter.length > 0
      ? persons.filter((person) => person.name.toLowerCase().includes(filter))
      : persons
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
