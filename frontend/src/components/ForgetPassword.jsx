import { useState } from "react"
import { apiConnector } from "../connector/apiConnector";

function ForgetPassword (){

    const [email, setEmail] = useState('')

    async function handleOnSumbit(e){
        e.preventDefault();
        try {
            const response = await apiConnector("POST", `${process.env.REACT_APP_BASE_URL}/forgetPassword`, {email:email})

            console.log("FOrGET API RESPONSE.....", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            alert(`visit the link to reset password ${response.data.link}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={(e)=>handleOnSumbit(e)} className="form">
        <div className="element">
            <label>Email</label>
            <input type="text" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <button type="submit" className="button">
            Submit
        </button>
       </form>
    )
}

export default ForgetPassword;