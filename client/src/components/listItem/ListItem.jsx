import './listItem.scss';
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListItem = ({item,index}) =>{

    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        const getMovie = async()=>{
            try {
                const res = await axios.get(`http://localhost:8800/api/movies/find/${item}`,{
                    headers: {
                      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                  });
                setMovie(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    },[item]);

    return(
        <Link className="link" to={{ pathname: "/watch", movie: movie}}>
        <div className="listItem" style={{ left: isHovered && index * 225 - 50 + index * 5 }} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
            <img src={movie.img} alt="stagod" />
            {isHovered && (
                <>
                <video src={movie.trailer} autoPlay={true} loop />
                <div className="itemInfo">
                    <div className="icons">
                        <PlayArrow className="icon"/>
                        <Add className="icon"/>
                        <ThumbUpAltOutlined className="icon"/>
                        <ThumbDownOutlined className="icon"/>
                    </div>
                    <div className="itemInfoTop">
                        <span>1 hour 14 mins</span>
                        <span className="limit">{movie.limit}</span>
                        <span>{movie.year}</span>
                    </div>
                    <div className="desc">
                        {movie.desc}
                    </div>
                    <div className="genre">{movie.genre}</div>
                </div>
                </>
            )}
            
        </div>
        </Link>
    );
}

export default ListItem;
