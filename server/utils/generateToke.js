import jwt from 'jsonwebtoken'



export const generateToken=(res,user_id)=>{
    const token=jwt.sign({user_id},process.env.JWT_SECRET,{
        expiresIn:'2d', 
    })

    res.cookie('jwtuser',token,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:2 * 24 * 60 * 60 *1000
    })
    return token
}




export const generateAdminToken=(res,admin_id)=>{

    try {
        const adminToken=jwt.sign({admin_id},process.env.JWT_SECRET_ADMIN,{
            expiresIn:'2d',
        })
    
        res.cookie('jwtadmin',adminToken,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:2*24*60*60*1000
    
        })
        return adminToken
        
    } catch (error) {

    console.log("error generatimf admin token")
    console.log(error.message)
        
    }
  
}