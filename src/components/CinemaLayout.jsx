import { createContext, useContext, useState, ReactNode } from "react";



const CinemaContext = createContext()

export const useCinemaContext = () =>{
    return useContext(CinemaContext)
}

function CinemaLayout({children}){
    const [searchQuery, setSearchQuery] = useState("");
    const [searchGenres, setSearchGenres] = useState("");
    const [basket,setBasket] = useState([])
    const [limit, setLimit] = useState(25);
    const searchSettings = { searchQuery, setSearchQuery, searchGenres, setSearchGenres, limit, setLimit };
    const basketSettings = { basket, setBasket}
    return(
        <CinemaContext.Provider value={{searchSettings,basketSettings}}>
            {children}
        </CinemaContext.Provider>
    )
}

export default CinemaLayout