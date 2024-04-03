import { useState } from "react";
import { apiConnector } from "../connector/apiConnector";



function SignUp(){

    const [formData, setFormData] = useState({firstName:'', lastName:"", email:'', password:''});

    async function handleOnSubmit(e){
        e.preventDefault()
      
            try {
           
                const response = await apiConnector("POST",  `${process.env.REACT_APP_BASE_URL}/signup`, formData)
    
                console.log("SIGNUP API RESPONSE.....", response)
    
                if (!response.data.success) {
                    throw new Error(response.data.message)
                }
    
                alert("Signup Successful")
            } catch (error) {
                
            }
        
       
    }

    return (
        <form onSubmit={(e)=>handleOnSubmit(e)} className="form">
            <div className="element">
                <label>FirstName</label>
                <input type="text" required value={formData.firstName} 
                onChange={(e)=>setFormData((prev)=>({ ...prev, firstName:e.target.value}))}/>
            </div>
            <div className="element">
                <label>LastName</label>
                <input type="text" required value={formData.lastName} 
                onChange={(e)=>setFormData((prev)=>({ ...prev, lastName:e.target.value}))}/>
            </div>
            <div className="element">
                <label>Email</label>
                <input type="text" required value={formData.email} 
                onChange={(e)=>setFormData((prev)=>({ ...prev, email:e.target.value}))}/>
            </div>
            <div className="element">
                <label>Password</label>
                <input type="password" required value={formData.password} 
                onChange={(e)=>setFormData((prev)=>({ ...prev, password:e.target.value}))}/>
            </div>
            <button type="submit" className="button">
                    Submit
            </button>
        </form>
    )
}

export default SignUp