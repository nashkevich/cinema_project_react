import { useEffect, useState } from "react"
import FilmList from "../components/FilmList"
import api from "../api"
import NavBarFilms from "../components/NavBarFilms"
function MainPage(){
    const [basket,setBasket] = useState([])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(25)
    const [numOfPages,setNumOfPages] = useState(0)
    const [searchQuery,setSearchQuery] = useState("")
    const [searchGenres,setSearchGenres] = useState("")
    const createPagination = async ()=>{
        const result = await api.get('movie?isCount=true')
        const num = Math.round(result.data.response / limit)
        setNumOfPages(num)
    }
    
    function changePage(isNext){
        setPage((prevPage)=>{
            if(isNext && page != numOfPages){
                return prevPage + 1
            }else if(!isNext && prevPage != 1){
                return prevPage - 1
            }else{
                return prevPage
            }
        })
    }
    useEffect(()=>{
        const getBasket = async ()=>{
            const result = await api.get('user/basket')
            const basket = result.data.response.basket
            setBasket(basket)
        }
        createPagination()
        getBasket()
    },[])
    return(
        <div className="main-container">
            <NavBarFilms setLimit={setLimit} setSearchQuery={setSearchQuery} setSearchGenres={setSearchGenres}></NavBarFilms>
            <div className="container-wrapper">
                <span onClick={()=>{changePage(false)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></span>
                <FilmList page={page} setLimit={setLimit} limit={limit} searchQuery={searchQuery} searchGenres={searchGenres} setNumOfPages={setNumOfPages} basket={basket} setBasket={setBasket}></FilmList>
                <span onClick={()=>{changePage(true)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></span>
            </div>
        </div>
    )
}

export default MainPage