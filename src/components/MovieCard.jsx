import React from 'react';


function MovieCard({movieData}){
    return(
        <div>
            <h2>
                {movieData.title}
            </h2>
            <img src={movieData.poster} />
        </div>
    )
}

export default MovieCard