import { CalendarToday, MailOutline, PermIdentity, Publish, } from "@material-ui/icons";
import { useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { updateUser } from '../../context/userContext/apiCalls'
import { UserContext } from "../../context/userContext/UserContext";
import "./user.css";
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
  
  export default function User() {

    const { isFetching , dispatch } = useContext(UserContext);
    const location = useLocation();
    const user = location.user;
    const history = useHistory();
    const [ img, setImg] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({});
    const [uploaded, setUploaded] = useState(0);

    //upload pictrue to firebase
    const upload = (item) => {
        if(!item) return;
        const fileName = new Date().getTime() + item.label + item.file.name;
        const storageRef = ref(storage, `files/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, item.file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(prog + "%");
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUpdatedUser((prev)=>{
                return { ...prev, [item.label] : downloadURL }
              });
              setUploaded((prev)=>prev+1)
            });
          }
        );
    };

    const handleUpload = (e) => {
      e.preventDefault();
      upload({file : img, label: "profilePic"})
    }
    //after uploading we update user and go back to users
    const handleUpdate = async(e) => {
      e.preventDefault();
      await updateUser(updatedUser, user._id, dispatch);
      if(!isFetching) history.push("/users");
    }

    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.profilePic ? user.profilePic : "https://image.shutterstock.com/image-vector/avatar-man-icon-profile-placeholder-260nw-1229859850.jpg"}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{user.createdAt.slice(0,10)}</span>
              </div>
              <span className="userShowTitle">Contact Details</span> 
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">annabeck99@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>{user.username}</label>
                  <input
                    type="text"
                    name="username"
                    placeholder={user.username}
                    className="userUpdateInput"
                    onChange={(e)=>setUpdatedUser({...updatedUser, [e.target.name] : e.target.value })}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder={user.email}
                    className="userUpdateInput"
                    onChange={(e)=>setUpdatedUser({...updatedUser, [e.target.name] : e.target.value })}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="userUpdateInput"
                    onChange={(e)=>setUpdatedUser({...updatedUser, [e.target.name] : e.target.value })}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={user.profilePic ? user.profilePic : "https://image.shutterstock.com/image-vector/avatar-man-icon-profile-placeholder-260nw-1229859850.jpg"}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" name="profilePic" id="file" onChange={(e)=>setImg(e.target.files[0])} style={{ display: "none" }} />
                </div>
                { uploaded ===0 ? (<button className="userUpdateButton" onClick={handleUpload}>Upload</button>) : (<button className="userUpdateButton" onClick={handleUpdate} disabled={isFetching} >Update</button>)}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }