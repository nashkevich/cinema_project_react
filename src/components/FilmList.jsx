import { useEffect, useState } from "react"
import api from "../api"
import MovieCard from "./MovieCard"
function FilmList({page,setLimit,limit,searchQuery,searchGenres,setNumOfPages,basket,setBasket}){
    const [filmList,setFilmList] = useState([])
    const [filterList,setFilterList] = useState([])
    const getMoviePage =async()=>{
        const result = await api.get(`movie?page=${page}&limit=${limit}`)
        setFilmList(result.data.response)
    }
    const createPagination = async ()=>{
        const result = await api.get('movie?isCount=true')
        const num = Math.round(result.data.response / limit)
        setNumOfPages(num)
    }

    function cutFilterList(filterList){
        const from = ((page-1)* limit)
        const to = page * limit
        
        const paginationFilms = filterList.slice(from,to)
        return paginationFilms
    }
    const getFilterFilms =async ()=> {
        const result = await api.get(`movie?searchQuery=${searchQuery}&searchGenres=${searchGenres}`)
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
            const newFilms  = cutFilterList(filterList)
            setFilmList(newFilms)
        }else{
            getMoviePage()
        }
    },[limit,page])
    useEffect(()=>{
        if(searchQuery != '' || searchGenres != ''){
            getFilterFilms()
        }else{
            setFilterList([])
            getMoviePage()
            createPagination()
        }
    },[searchQuery,searchGenres])
    useEffect(()=>{
        setTimeout(()=>{
            const grid = document.querySelector('.film-list-wrapper')
            const gridDivs = document.querySelectorAll('.film-list-wrapper > div')
            const numOfElementsInRow = Math.round(grid.offsetWidth/gridDivs[0].offsetWidth)
            setLimit((prev)=>{
                if(prev % numOfElementsInRow != 0){
                    return prev - prev % numOfElementsInRow
                }
                return prev

            })
        },100)
    },[])
    return(
        <div className="film-list-wrapper">
            {filmList.map((film,index)=>{
                return <div key={film.id} className="wrapper-card"><MovieCard key={index}  movieData={film} basket={basket} setBasket={setBasket}/></div>
            })}
        </div>
    )
}

export default FilmList