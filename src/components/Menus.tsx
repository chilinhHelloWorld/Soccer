import img from '../image/download.png'
import { Link } from 'react-router-dom';
const Menus = () => {
    return (
        <div>
            <div className="navbar">
                <b className="navbar-brand">TS-React</b>
                <ul className="nav navbar-nav">
                    <li className="active">
                        <Link to="/UserList">User</Link>
                    </li>
                    <li className="active">
                        <Link to="/Home">Home</Link>
                    </li>
                </ul>
                <div>
                <Link
                to={"/"}
                className="btn btn-large btn-block btn-danger btnLogout" 
                >Logout</Link>
            </div>
            </div>
            
        </div>
    )
}
export default Menus;