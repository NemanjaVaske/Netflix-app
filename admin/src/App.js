import './app.css';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import Login from './pages/login/Login';
import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';
import MovieList from './pages/movieList/MovieList';
import Movie from './pages/movie/Movie';
import NewMovie from './pages/newMovie/NewMovie';
import List from './pages/list/List';
import ListList from './pages/listList/ListList';
import NewList from './pages/newList/NewList';


function App() {

  const { user } = useContext(AuthContext);
  
  return (
    <Router>
      <Switch>
      {!user && (
          <>
          <Route path="/" exact>{!user? <Redirect to="/login"/> : <Home/>}</Route>
            <Route path="/login"><Login/></Route>
          </>
      )}  
      {user && (
        <>
      <Topbar/>
      <div className="container">
        <Sidebar/>
          <Route path="/" exact>
            <Home/>   
          </Route>
          <Route path="/users">
            <UserList/>
          </Route>
          <Route path="/user/:userId">
            <User/>
          </Route>
          <Route path="/movies">
            <MovieList/>
          </Route>
          <Route path="/movie/:movieId">
            <Movie/>
          </Route>
          <Route path="/newMovie">
            <NewMovie/>
          </Route>
          <Route path="/lists">
            <ListList/>
          </Route>
          <Route path="/list/:listId">
            <List/>
          </Route>
          <Route path="/newList">
            <NewList/>
          </Route>
        
      </div>
      </>)}
      </Switch>
    </Router>
  );
}

export default App;
