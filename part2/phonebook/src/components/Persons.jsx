import DeleteBtn from './DeleteBtn'

const Persons = ({persons, handleDelete}) => {
    return(
        <div>
          {persons.map(person => 
            <p key={person.id}>{person.name} {person.number}
            <DeleteBtn handleDelete={() => handleDelete(person.id)} />
            </p>
          )}
        </div>
      )
}

export default Persons