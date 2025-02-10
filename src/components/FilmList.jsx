import { useEffect, useState } from "react"
import api from "../api"
import MovieCard from "./MovieCard"
function FilmList({page,limit,searchQuery,setNumOfPages}){
    const [filmList,setFilmList] = useState([])
    const [filterList,setFilterList] = useState([])
    const getMoviePage =async()=>{
        const result = await api.get(`movie?page=${page}&limit=${limit}`)
        setFilmList(result.data.response)
    }
    
    function cutFilterList(filterList){
        const from = ((page-1)* limit)
        const to = page * limit
        
        const paginationFilms = filterList.slice(from,to)
        return paginationFilms
    }
    const getFilterFilms =async ()=> {
        const result = await api.get(`movie?searchQuery=${searchQuery}`)
        if(result){
            setFilterList(result.data.response)
            const newNumberOfPages = Math.round(result.data.response.length/limit)
            setNumOfPages(newNumberOfPages)
            const newFilms  = cutFilterList(result.data.response)
            setFilmList(newFilms)
        }
       }
    useEffect(()=>{
        if(filterList.length != 0){
            const newFilms  = cutFilterList(result.data.response)
            setFilmList(newFilms)
        }else{
            getMoviePage()
        }
    },[page])
    useEffect(()=>{
        
        if(searchQuery != ''){
            getFilterFilms()
        }else{
            getMoviePage()
        }
    },[searchQuery])
    return(
        <div className="film-list-wrapper">
            {filmList.map((film,index)=>{
                return <div className="wrapper"><MovieCard key={index}  movieData={film}/></div>
            })}
        </div>
    )
}

export default FilmList