import {useNavigate} from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()

    return (
        <footer>
                    <button onClick={() => navigate('/')}>Back to Home page</button>
                    <br></br>
                    <button onClick={() => navigate('/artwork')}>Artwork Search page</button>
                    <br></br>
                    <button onClick={() => navigate('/exhibitions')}>Exhibitions page</button>



        </footer>

    )
}
export default Footer