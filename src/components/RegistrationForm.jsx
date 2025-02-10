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
        <>
        <form onSubmit={submitForm}>
            <h3>Sign Up</h3>
            <input placeholder="Name" type="text" value={formData.username} name="username" onChange={handleOnChange} />
            <input placeholder="Email" type="email" value={formData.email} name="email" onChange={handleOnChange} />
            <input placeholder="Password" type="password" value={formData.password} name="password" onChange={handleOnChange} />
            <input placeholder="Confirm Password" type="password" value={formData.password_confirm} name="password_confirm" onChange={handleOnChange} />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default RegistrationForm