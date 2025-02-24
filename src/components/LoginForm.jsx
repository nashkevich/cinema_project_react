import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
function LoginForm(){
    let navigation = useNavigate()
    const [formData,setFormData] = useState({
        'username':'',
        'password':''
    })
async function SubmitForm(e){
    e.preventDefault()
    try{
        const result = await axios({url:'http://127.0.0.1:8000/api/token',
            method:"POST",
            data:JSON.stringify(formData),
            headers:{'Content-Type':'application/json'}
        })
        if(result.status == 200){
            console.log("Login")
            localStorage.setItem('token',result.data.access)
            localStorage.setItem('refreshToken',result.data.refresh)
            navigation("/cinema/main")
        }
    }catch(e){
        console.log("Error while making request")
        console.log(e)
    }

    
}
const handleOnChange = (e)=>{
    const {name,value} = e.target
    setFormData((prevData)=>{
        const newData = {...prevData}
        newData[name] = value
        return newData
    })
}
    return (
        <div className="auth-container">

            <div className="form-container">
            <form className="form-sign-up" onSubmit={SubmitForm}>
                <h2>Sign In</h2>
            <div className="form-input-box">
                <label htmlFor="username">Name</label>
                <input type="text" name="username" value={formData['username']} placeholder="John" onChange={handleOnChange}/>
            </div>
            <div className="form-input-box">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData['password']} placeholder="gdfghtrrtfd" onChange={handleOnChange}/>
            </div>
            <div className="form-input-box">
                <a href="/auth/registration">Sign Up</a>
            </div>
            <button className="main-btn" type="submit">Login</button>
        </form>
            </div>
            {/* <div className="auth-img">
                <img src="/logo.png" alt="" width='200px' height='200px' />
                <h2 className="logo">Block Buster</h2>
            </div> */}
            
        </div>
    )
}   

export default LoginForm