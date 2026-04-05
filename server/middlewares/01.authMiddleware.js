import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    console.log(authHeader);
    
    const token = authHeader.split(" ")[1];


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