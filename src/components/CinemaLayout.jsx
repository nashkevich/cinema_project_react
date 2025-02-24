import { createContext, useContext, useState, ReactNode } from "react";



const CinemaContext = createContext()

export const useCinemaContext = () =>{
    return useContext(CinemaContext)
}

function CinemaLayout({children}){
    const [searchQuery, setSearchQuery] = useState("");
    const [searchGenres, setSearchGenres] = useState("");
    const [limit, setLimit] = useState(25);
    return(
        <CinemaContext.Provider value={{searchQuery,setSearchQuery,searchGenres,setSearchGenres,limit,setLimit}}>
            {children}
        </CinemaContext.Provider>
    )
}

export default CinemaLayout