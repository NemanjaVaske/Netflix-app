import { useContext, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import "./list.css";

export default function List() {

  const [uploadedList,setUploadedList] = useState({});
  const { isFetching , dispatch } = useContext(ListContext);
  const history = useHistory();
  const location = useLocation();
  const list = location.list;
  //updating list of movies
  const handleUpdate = async(e) =>{
    e.preventDefault();
    await updateList(uploadedList, list._id, dispatch);
    if(!isFetching) history.push("/lists");
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input type="text" name="title" placeholder={list.title} onChange={(e)=>setUploadedList({...uploadedList, [e.target.name]: e.target.value})} />
            <label>Type</label>
            <input type="text" name="type" placeholder={list.type} onChange={(e)=>setUploadedList({...uploadedList, [e.target.name]: e.target.value})} />
            <label>Genre</label>
            <input type="text" name="genre" placeholder={list.genre} onChange={(e)=>setUploadedList({...uploadedList, [e.target.name]: e.target.value})} />
          </div>
          <div className="productFormRight">
            <button className="productButton" disabled={isFetching} onClick={handleUpdate}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}