import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){

    const authToken = req.cookies.authToken;

    //Redirect to login page
    if(!authToken){
        return res.redirect('/signup'); // not logged in
    }

    try {
        const decodedToken = jwt.verify(authToken,process.env.JWT_SECRET);
        // req.userId = decodedToken.userId;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({message:"Error"});
    }

}

export {authMiddleware}