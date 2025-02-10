function NavBarFilms({setSearchQuery,setSearchGenres}){
    return (
        <div>
            <input type="text" name='filmName' onChange={(e)=>setSearchQuery(e.target.value)}/>
            <select onChange={(e)=>{setSearchGenres(e.target.value)}} name="genre" id="genre">
                <option value="Horror">Horror</option>
                <option value="Drama">Drama</option>
                <option value="Crime">Crime</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Fantasy">Fantasy</option>
            </select>
        </div>
    )
}

export default NavBarFilms