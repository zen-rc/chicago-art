function ExhibitionsInfo({exhibitions}) {

    return (
        <div>
            <h1>Exhibitions page</h1>
            <br></br>
            <ol>
                {exhibitions.map((exhibit, index) => (
                    <li key ={index}>
                        <p>Title: {exhibitions[index].gallery_title}</p>
                        <p>Start Date: {exhibitions[index].aic_start_at}</p>
                        <p>End Date: {exhibitions[index].aic_end_at}</p>
                        <p>Description: {exhibitions[index].short_description}</p>
                        <br></br>
                    </li>
                ))}

            </ol>
        </div>
    )
}
export default ExhibitionsInfo