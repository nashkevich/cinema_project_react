import React from 'react';


function MovieCard({movieData}){
    return(
        <div className='movie-card'>
            <div className="card-img" style={{ '--image-url': `url(${movieData.poster ? movieData.poster : 'none'})` }}></div>
            <div className='card-footer'>
                <h2>{movieData.title}</h2>
                {/* <h2>{movieData.year}</h2> */}
            </div>
        </div>
    )
}

export default MovieCard