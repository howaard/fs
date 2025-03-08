const ShowBtn = ({handleShow, country}) => {
    return(
        <button onClick = {() => handleShow(country)}>Show</button>
    )
}

export default ShowBtn