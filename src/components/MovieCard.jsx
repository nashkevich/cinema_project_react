import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router';
import api from '../api'

function MovieCard({movieData,basket,setBasket}){
    const navigate = useNavigate()
    const handleClickLiked = async ()=>{
        let newBasket = [...basket]
        if(newBasket.includes(movieData.id)){
            newBasket = newBasket.filter((item)=>{
                return item != movieData.id
            })
        }else{
            newBasket.push(movieData.id)
        }
        const result = await api.put('user/basket',{'basket':newBasket})
        console.log("Set new basket",newBasket)
        setBasket(newBasket)
    }
    return(
        <div className='movie-card card-img'  onClick={()=>{navigate(`/cinema/movie/${movieData.id}`,{ state: movieData })}} style={{ '--image-url': `url(${movieData.poster ? movieData.poster : 'none'})` }}>
                <div className='card-bottom'>
                    <h2>{movieData.title}</h2>
                    <span className={basket.includes(movieData.id) ? 'isLiked':''} onClick={(event)=>{event.stopPropagation();handleClickLiked()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"  fill="white"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>
                    </span>
                </div>
                {/* <h2>{movieData.year}</h2> */}
        </div>
    )
}

export default MovieCard