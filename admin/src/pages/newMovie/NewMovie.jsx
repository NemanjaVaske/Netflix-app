import "./newMovie.css";
import { useContext, useState } from "react";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useHistory } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function NewMovie() {

  const {isFetching ,dispatch} =useContext(MovieContext);

  const [movie, setMovie] = useState({});
  const [ img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const history = useHistory();

  //waiting to create movie and then go back to movies list, for that time create button is disabled
  const handleCreate = async(e) =>{
    e.preventDefault();
    await createMovie(movie,dispatch);
    if(!isFetching) history.push("/movies")
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
            setMovie((prev)=>{
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
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
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
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={(e)=>setMovie({...movie, [e.target.name] : e.target.value})}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={(e)=>setMovie({...movie, [e.target.name] : e.target.value})}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={(e)=>setMovie({...movie, [e.target.name] : e.target.value})}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={(e)=>setMovie({...movie, [e.target.name] : e.target.value})}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={(e)=>setMovie({...movie, [e.target.name] : e.target.value})}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={(e)=>setMovie({...movie, [e.target.name] : e.target.value})}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={(e)=>setMovie({...movie, [e.target.name] : e.target.value})}>
            <option>Is Series</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            id="trailer"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {
          uploaded === 5 ? (<button className="addProductButton" onClick={handleCreate} disabled={isFetching} >
          Create
        </button>) : (<button className="addProductButton" onClick={handleUpload} disabled={isFetching} >
            Upload
          </button>)
        }
          
      </form>
    </div>
  )
  
}