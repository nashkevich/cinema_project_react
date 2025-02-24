import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

function RegistrationForm(){
    let navigate = useNavigate()
    const [formData,setFormData] = useState({
        'username':'',
        'email':'',
        'password':'',
        'password_confirm':''
        })
    function handleOnChange(e){
        const {name,value} = e.target
        setFormData((prevData)=>{
            let newData = {...prevData}
            newData[name] = value
            return newData
        })
    }
    async function submitForm(e){
        e.preventDefault()
        try{
            const result = await axios({url:'http://127.0.0.1:8000/register',method:"POST"
            ,data:JSON.stringify(formData)
            ,headers:{"Content-Type":"application/json"}})
            if(result.status >=200 && result.status <= 300){
                navigate('/auth/login')
            }
        }catch(error){
            console.log(error)
        }
        
    }
    return(
        <div className="auth-container">
            <form className="form-sign-up" onSubmit={submitForm}>
            <h2>Sign Up</h2>
            <div className="form-input-box">
                <label htmlFor="username">Name</label>
                <input placeholder="John" type="text" value={formData.username} name="username" onChange={handleOnChange} />
            </div>
            <div className="form-input-box">
                <label htmlFor="email">Email</label>
                <input placeholder="example@gmail.com" type="email" value={formData.email} name="email" onChange={handleOnChange} />
            </div>
            <div className="form-input-box">
                <label htmlFor="password">Password</label>
                <input placeholder="gdfghtrrtfd" type="password" value={formData.password} name="password" onChange={handleOnChange} />
            </div>
            <div className="form-input-box">
                <label htmlFor="password_confirm">Confirm Password</label>
                <input placeholder="gdfghtrrtfd" type="password" value={formData.password_confirm} name="password_confirm" onChange={handleOnChange} />
            </div>
            <div className="form-input-box">
                <a href="/auth/login">Login</a>
            </div>
            <button className="main-btn" type="submit">Submit</button>
        </form>
        </div>
    )
}

export default RegistrationForm