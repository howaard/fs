const Search = ({newInput, handleInputChange}) => {
    return (
        <div>
            filter shown with <input value={newInput} onChange={handleInputChange}/>
        </div>
    )
    
}

export default Search