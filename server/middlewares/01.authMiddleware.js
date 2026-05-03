import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){

    //Extract the authentication header from the request header.
    const authHeader = req.headers.authorization;

    //If there is not authentication header send a error message or redirect user to sign up page.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    //Get the token of off header    
    const token = authHeader.split(" ")[1];

    //Decode token and if its valid move to the request.
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({message:"Invalid Token"});
    }

}

export {authMiddleware}