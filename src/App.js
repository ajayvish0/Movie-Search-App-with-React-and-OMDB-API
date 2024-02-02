import  { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard.jsx";
 

//5e629918
const API_URL = process.env.REACT_APP_OMDB_API_KEY ;

const App = () => {
   
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async(title)  => {
       const response = await fetch(`${API_URL}&s=${title}`);
       const data = await response.json();
        
        setMovies(data.Search);
    } 
    useEffect(() => {
       searchMovies("Batman");
    }, []);

   const chnge = (e) =>{
      setSearchTerm(e.target.value)
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            searchMovies(e.target.value)
            
             
        }
        

 
    }
     
    return (
        <div className="app">
            <h1> Movies </h1>
            <div className="search">
                <input placeholder="Search for movies" value={searchTerm} onChange={chnge} onKeyDownCapture={handleKeyDown} />
                <img src={SearchIcon} alt="search" onClick={()=>searchMovies(searchTerm)} />
                 
            </div>
          
            {
                movies?.length > 0  ? (
                    <div className="container">
                    {
                        movies.map((movie) => (<MovieCard movie={movie} />) ) 
                    
                    } 
                    </div>
                )
            
 
                : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

           
        </div>
    );

}

export default App;