import './widgetSm.css';
import { Visibility } from '@material-ui/icons'
import { useEffect, useState } from 'react';
import axios from 'axios';

const WidgetSm = () => {

  const [newUsers, setNewUsers] = useState([]);
  //fetching latest users
  useEffect(()=>{
    const getNewUser = async()=>{
      const res = await axios.get("http://localhost:8800/api/users?new=true",{
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setNewUsers(res.data);
    }
    getNewUser();
  },[]);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
              {newUsers.map((user)=>(
                <li key={user._id} className="widgetSmListItem">
                <img
                  src={user.profilePic? user.profilePic: "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                  <span className="widgetSmUserTitle">{user.email}</span>
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </li>
              ))}
            </ul>
        </div>
    );
}

export default WidgetSm;
