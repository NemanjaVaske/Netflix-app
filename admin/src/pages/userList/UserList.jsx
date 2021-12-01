import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext/UserContext';
import { deleteUser, getUsers } from '../../context/userContext/apiCalls';

const UserList = () => {

    const { users, dispatch } = useContext(UserContext);
    //gel all users
    useEffect(()=>{
        getUsers(dispatch);
    },[dispatch]);

    const handleDelete = (id)=>{
      deleteUser(id,dispatch);
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 120 },
        { field: 'username', headerName: 'Username', width: 200, renderCell: (params)=>{
            return(
                <div className="userListUser">
                    <img className="userListImg" src={params.row.profilePic? params.row.profilePic : "https://image.shutterstock.com/image-vector/avatar-man-icon-profile-placeholder-260nw-1229859850.jpg"} alt=""/>
                    {params.row.username}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 200, },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params)=>{
            return(
                <>
                <Link to={{ pathname: "/user/" + params.row._id, user: params.row }}>
                <button className="userListEdit">Edit</button>
                </Link>
                <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row._id)} />
                </>
            )
        } }
      ];
      
    return (
        <div className="userList">
            <DataGrid rows={users} disableSelectionOnClick rowsPerPageOptions={[8]} columns={columns} pageSize={8} checkboxSelection getRowId={r=>r._id}  />
        </div>
    );
}

export default UserList;
