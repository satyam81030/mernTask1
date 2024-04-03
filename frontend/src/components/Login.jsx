import { useState } from "react";
import { Link } from "react-router-dom";
import { apiConnector } from "../connector/apiConnector";

function Login(){
    const [formData, setFormData] = useState({email:'', password:''});

    async function handleOnSumbit(e){
        e.preventDefault();
        try {
            const response = await apiConnector("POST", `${process.env.REACT_APP_BASE_URL}/login`, {email:formData.email, password:formData.password})

            console.log("LOGIN API RESPONSE.....", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            alert("Login Successful")
        } catch (error) {
            console.log(error)
        }
    }

    return (
    
       <form onSubmit={(e)=>handleOnSumbit(e)} className="form">
        <div className="element">
            <label>Email</label>
            <input type="text" required value={formData.email} onChange={(e)=>setFormData((prev)=>({...prev, email: e.target.value}))}/>
        </div>
        <div className="element">
            <label>Password</label>
            <input type="password" required value={formData.password} onChange={(e)=>setFormData((prev)=>({...prev, password: e.target.value}))}/>
        </div>
        <button type="submit" className="button">
            Submit
        </button>
        <div>
            <Link to="forgetPassword"
            >
                forget password
            </Link>
        </div>
       </form>
    )
}

export default Login;