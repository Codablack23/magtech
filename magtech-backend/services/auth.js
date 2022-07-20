async function authenticate(req,res,next){
    if(req.session.user){
       next()
    }
    else{
        res.status(403).json({
            status:"Unauthorized",
            error:"you are not logged in"
        })
    }
}
async function authenticateAdmin(req,res,next){
    if(req.session.admin){
       next()
    }
    else{
        res.status(503).json({
            status:"Unauthorized",
            error:"You are not allowed"
        })
    }
}

module.exports={
    authenticate,
    authenticateAdmin
}