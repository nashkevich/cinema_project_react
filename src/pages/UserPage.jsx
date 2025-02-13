import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import api from "../api"
function UserPage(){
    const [likedMovies,setLikedMovies] = useState([])
    async function getFilm(movieId){
        const result = await api.get(`movie/${movieId}`)
        setLikedMovies((prevMovies)=>{
            // console.log(typeof prevMovies)
            let newList = [...prevMovies]
            console.log(newList)
            if(result.data.response in newList){
                console.log(result)
                return prevMovies
            }
            newList.push(result.data.response)
            return newList
        })
    }
    const getBasket = async()=>{
        const result = await api.get('user/basket')
        const userBasket = result.data.response.basket
        if(userBasket && typeof userBasket == 'object'){
            setBasket(userBasket)
            userBasket.forEach(getFilm)
        }else{
            return {}
        }
    }
    const [basket,setBasket] = useState()
    useEffect(()=>{
        getBasket()        
    },[])
    return(
        <div>
            <h3>Saved Movies</h3>
            {likedMovies.length > 0 ? likedMovies.map((film)=>{return <MovieCard movieData={film} setBasket={setBasket} basket={basket}></MovieCard>}) : <h2>No films</h2>}
        </div>
    )
}

export default UserPage