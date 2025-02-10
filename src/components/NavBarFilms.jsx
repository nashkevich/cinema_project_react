function NavBarFilms({setSearchQuery}){
    return (
        <div>
            <input type="text" name='filmName' onChange={(e)=>setSearchQuery(e.target.value)}/>
        </div>
    )
}

export default NavBarFilms