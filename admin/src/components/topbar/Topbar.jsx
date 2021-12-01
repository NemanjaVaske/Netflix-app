import './topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { Logout } from '../../context/authContext/apiCalls';
import { useHistory } from 'react-router-dom';

const Topbar = () => {

    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () =>{
        Logout(dispatch);
        history.push("/login")
    }

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topbarLeft">
                    <span className="logo">neleadmin</span>
                </div>
                <div className="topbarRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                    </div>
                    <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topbarAvatar" />
                    <span className="logout" onClick={handleLogout} >Logout</span>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
