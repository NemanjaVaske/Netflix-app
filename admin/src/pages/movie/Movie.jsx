import { Link, useLocation, useHistory } from "react-router-dom";
import "./movie.css";
import { useState } from "react";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function Movie() {

  const { isFetching, dispatch } = useContext(MovieContext);
  
  const history = useHistory();
  const location = useLocation();
  const movie = location.movie;
  const [uploadMovie, setUploadMovie] = useState({});
  const [ img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  //after uploading we update movie
  const handleUpdate = async(e)=>{
    e.preventDefault();
    await updateMovie(uploadMovie, movie._id, dispatch);
    if(!isFetching) history.push("/movies");
  }
  //uploading files to firebase, movie pictures, video and trailer
  const upload = (items) => {
    items.forEach((item) => {
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
            setUploadMovie((prev)=>{
              return { ...prev, [item.label] : downloadURL }
            });
            setUploaded((prev)=> prev + 1);
          });
        }
      );
    });
  };
  
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" name="title" placeholder={movie.title} onChange={(e)=>setUploadMovie({...uploadMovie, [e.target.name]: e.target.value})} />
            <label>Year</label>
            <input type="text" name="year" placeholder={movie.year} onChange={(e)=>setUploadMovie({...uploadMovie, [e.target.name]: e.target.value})} />
            <label>Genre</label>
            <input type="text" name="genre" placeholder={movie.genre} onChange={(e)=>setUploadMovie({...uploadMovie, [e.target.name]: e.target.value})} />
            <label>Limit</label>
            <input type="text" name="limit" placeholder={movie.limit} onChange={(e)=>setUploadMovie({...uploadMovie, [e.target.name]: e.target.value})} />
            <label>Trailer</label>
            <input
            type="file"
            id="trailer"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
            <label>Video</label>
            <input
            type="file"
            id="video"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
          </div>
          <div className="productFormRight">
          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
            </div>
            {uploaded === 5? (<button className="productButton" onClick={handleUpdate} disabled={isFetching}>Update</button>):
            (
              <button className="productButton" onClick={handleUpload} disabled={isFetching}>Upload</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}