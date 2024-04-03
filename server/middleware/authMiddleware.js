const jwt= require('jsonwebtoken')

exports.authMiddleware = (req, res, next)=>{
    try {

        const bearerToken = req.headers['authorization'].split(' ')[1];
      
        
        if (!bearerToken) {
            return res.status(404).json({
                succcess:false,
                message:"Your are allowed here"
            })
        }

        const user = jwt.verify(bearerToken, process.env.JWT_SECRETE);
        if (!user) {
            return res.status(404).json({
                succcess:false,
                message:"Invalid token"
            })
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            succcess:false,
            message:"Somthing went wrong in middle"
        })
    }
}

