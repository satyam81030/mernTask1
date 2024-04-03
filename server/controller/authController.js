const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const connection = require('../config/dbConnect')

exports.signUp = (req, res) => {
    try {
        let { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            throw Error("All Field Required")
        }

        bcrypt.hash(password, 10, (hashError, hashedPassword) => {
            if (hashError) {
                console.log("Error hashing password", hashError)
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            }
             password=hashedPassword
            connection.query('INSERT INTO authTable (firstName, lastName, email, password) VALUES (?, ?, ?, ?) ', [firstName, lastName, email, hashedPassword], (err,data) => {
                if (err) {
                    console.log(err)
                    return res.status(404).json({
                        success: false,
                        message: "error while inserting data",
                    })
                }
                else {
                    return res.status(202).json({
                        success: true,
                        message: "user register successfully, Please Login",
                        data
                    })
                }
            })


        })


    } catch (error) {
        console.log("errorr", error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "all fields required"
            })
        }

        
        connection.query("SELECT * FROM authTable WHERE email= ?", [email], (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error while executing loging query"
                })
            }
            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid Creidtions"
                })
            }
            const user = data[0];
            bcrypt.compare(password, user.password, (compareError, isMatch)=>{
                if (compareError) {
                    console.log("Eror while comparing passord", compareError)
                    return res.status(500).json({
                        success:false,
                        message:"Internal Server Error"
                    })
                }
                if (!isMatch) {
                    return res.status(404).json({
                        success:false,
                        message:"Invalid Cridintions"
                    })
                }

                const { firstName, lastName, email } = data[0];

                const token = jwt.sign({ firstName: firstName, lastName: lastName, email: email }, process.env.JWT_SECRETE)
    
                return res.status(202).json({
                    success: true,
                    message: "Login Successful",
                    token: token
                })

                
            } )


        })
    } catch (error) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.getUserDetails = (req, res) => {

    try {

        const { email } = req.user;

        if (!email) {
            return res.status(404).json({
                success: false,
                message: "unable to get details"
            })
        }

        connection.query("SELECT * FROM authTable WHERE email= ?", [email], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(404).json({
                    success: false,
                    message: "Error while get user deatil"
                })
            }
            return res.status(202).json({
                success: true,
                message: "All retrived successfully",
                data: data
            })
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching data",
        })

    }
}

exports.forgetPassword = (req, res) => {
    try {
        const {email} = req.body;
        //below wen can generate random token by crpto
        const token = Math.floor(Math.random() * 300) + process.env.JWT_SECRETE;
        const expires = new Date(Date.now() + (5*60000))

        console.log(expires)
        connection.query('UPDATE authTable SET resetToken = ?, resetTokenExpires=? WHERE email = ?', [token, expires, email], (err) => {
            if (err) {
                console.log("Error while updating user record", err);
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong"
                })
            }

            //Here we can use nodemailer to sent token
            console.log("reset password token", token);

            return res.status(202).json({
                success: true,
                message: "Password reset token sent",
                link:`http://localhost:3000/resetPassword/${token}`
            })

        });


    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching data",
        })
    }
}

exports.resetPassword = (req, res) => {
    
   const {token} = req.params;
    const { newPassword } = req.body;
    
    console.log(newPassword)
    const query = 'SELECT * FROM authTable WHERE resetToken = ? AND resetTokenExpires > NOW()';
    connection.query(query, [token], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Internal SErver Error"
            })
        }
        if (results.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid token or expired token"
            })
        }

        bcrypt.hash(newPassword, 10, (hashError, hashedPassword) => {
            if (hashError) {
                console.log("Error hashing password", hashError)
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            }

            const updateUserQuery = 'UPDATE authTable SET password = ?, resetToken = NULL WHERE resetToken = ?';
        connection.query(updateUserQuery, [hashedPassword, token], (err, results) => {
            if (err) {
                console.log("Error while updating in resetPassword", err)
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            }

            return res.status(202).json({
                success: true,
                message: "Password reset successfully"
            })
        })

        })

        
    })
}