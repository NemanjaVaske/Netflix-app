import './navbar.scss';
import { Search, Notifications, ArrowDropDown } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Logout } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';

const Navbar = () =>{

    const { dispatch, user } = useContext(AuthContext)
    //checking if page is scrolled or not
    const[isScrolled, setIsScrolled] = useState(false);

    const history = useHistory();

    window.onscroll = () =>{
        setIsScrolled( window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        Logout(dispatch);
        history.push("/login");
        
    }
     
    return(
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <Link to="/" className="link">
                    <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span>Series</span>
                    </Link>
                    <Link to="movies" className="link">
                        <span>Movies</span>
                    </Link>
                    <span>New and popular</span>
                    <span>My list</span>
                </div>
                <div className="right">
                    <Search className="icon"/>
                    <span>KID</span>
                    <Notifications className="icon"/>
                    <img src={user.profilePic ? user.profilePic : "https://image.shutterstock.com/image-vector/avatar-man-icon-profile-placeholder-260nw-1229859850.jpg"} alt="" />
                    <div className="profile">
                        <ArrowDropDown className="icon"/>
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;