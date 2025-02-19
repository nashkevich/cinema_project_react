import { useEffect, useState } from "react"
import api from "../api"
import MovieCard from "./MovieCard"
function FilmList({page,setLimit,limit,searchQuery,searchGenres,setNumOfPages,basket,setBasket}){
    const [filmList,setFilmList] = useState([])
    const [filterList,setFilterList] = useState([])
    const getMoviePage =async()=>{
        const result = await api.get(`movie?page=${page}&limit=${limit}`)
        console.log("GETMOVEIPAGE")
        console.log(result)
        setFilmList(result.data.response)
    }
    const createPagination = async ()=>{
        const result = await api.get('movie?isCount=true')
        const num = Math.round(result.data.response / limit)
        setNumOfPages(num)
    }
    // useEffect(()=>{
    //     window.addEventListener('resize',()=>{
    //             setLimit((prev)=>{
    //                 let newValue = prev
    //                 for(let i=0;i<limit;i++){
    //                     if(document.body.offsetHeight > window.innerHeight){
    //                         console.log(newValue)
    //                         return --newValue
    //                     }else{
    //                         return ++newValue
    //                     }
    //                 }
    //             })

    //     })
    // },[])
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
            console.log(result)
            setNumOfPages(newNumberOfPages)
            const newFilms  = cutFilterList(result.data.response)
            setFilmList(newFilms)
        }
       }
    useEffect(()=>{
        getMoviePage()
    },[limit])
    useEffect(()=>{
        if(filterList.length != 0){
            const newFilms  = cutFilterList(filterList)
            setFilmList(newFilms)
        }else{
            getMoviePage()
        }
    },[page])
    useEffect(()=>{
        if(searchQuery != '' || searchGenres != ''){
            getFilterFilms()
        }else{
            setFilterList([])
            getMoviePage()
            createPagination()
        }
    },[searchQuery,searchGenres])
    return(
        <div className="film-list-wrapper">
            {filmList.map((film,index)=>{
                return <div className="wrapper-card"><MovieCard key={index}  movieData={film} basket={basket} setBasket={setBasket}/></div>
            })}
        </div>
    )
}

export default FilmList