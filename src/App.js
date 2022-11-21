import {useEffect, useState} from 'react';
import './App.css';
import {getMovielist, searchmovie} from"./api"
function App  ()  {
const [popularMovies, setPopularMovies] = useState([])

  useEffect( () =>  {
    getMovielist().then((result) => {  //untuk menampung result
      setPopularMovies(result)
    })
  }, [])

  const PopularMovie = () => {
    return popularMovies.map((movie, i) =>{
        return(
          <div className="wrapper" key={i} >
              <div className="title">{movie.title}</div>
                <img className="movie-img" src={`${process.env.
                REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
                <div className="movie-date">release: {movie.release_date}</div>
                <div className="movie-rating">{movie.vote_average}</div>
            </div>
        )
  })
  }

  const search = async(q) =>{
    if(q.length > 3){
    const query = await searchmovie(q)
    setPopularMovies(query.results)
    //console.log({query: query})
    }
  }

  console.log({popularMovies: popularMovies})
  return (
    <div className="App">
      <header className="App-header">
         <h1>ORNOT-FILM</h1>
         <div className="MOVIE">
            <input 
            placeholder="Cari Film Kamu" 
            className="movie-search"
            onChange={({target}) => search(target.value)}
             />
             <div className="container">
               <PopularMovie />
            </div>
         </div>
      </header>
    </div>
  );
}

export default App;
