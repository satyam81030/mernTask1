import { useState } from "react";
import { apiConnector } from "../connector/apiConnector";
import { useLocation, useSearchParams } from "react-router-dom";


function ResetPassword() {
    const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' })
    const path = useLocation()

    async function handleOnSumbit(e) {
        e.preventDefault();
        if (formData.newPassword === formData.confirmPassword) {
            try {
                const response = await apiConnector("POST", `${process.env.REACT_APP_BASE_URL}/resetPassword/${path.pathname.split('/')[2]}`, { newPassword: formData.newPassword })

                console.log("REST PASSWORD API RESPONSE.....", response)

                if (!response.data.success) {
                    throw new Error(response.data.message)
                }

                alert("Password reset successfully")
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Password dosent match")
        }
    }

    return (
        <form onSubmit={(e) => handleOnSumbit(e)} className="form">
            <div className="element">
                <label>New Password</label>
                <input type="password" required value={formData.newPassword} onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))} />
            </div>
            <div className="element">
                <label>Confirm Password</label>
                <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))} />
            </div>
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    )
}

export default ResetPassword;