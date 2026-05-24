import express from 'express';
import jwt from 'jsonwebtoken';
import {pool} from '../db/01.createPool.js'

//Auth helpers
import { generateHashedPassword } from './auth_helpers/01.hashPassword.js';
import { validatePassword } from './auth_helpers/02.validatePassword.js';

const app = express();
app.use(express.json());

const router = express.Router();

//Handling the post request for authentication.
//This function returns jwt and username as a user field.
router.post("/login", async(req,res,next) =>{

        //Extract the email and password from the FORM body.
        let {username,password} = req.body;
        
        const existingUser = await pool.query(`SELECT id,username,password_hash FROM users WHERE username=$1`,[username]);

        //If user not found return user not found error.
        if(existingUser.rows[0] == null){
            return res.status(404).json({ message: "User Not Found, Please Enter Valid Credentials" });
        }

        const {id,password_hash} = existingUser.rows[0];

        //If user found check for password validity.
        const isValidPassword = await validatePassword(password,password_hash);

        if(isValidPassword){
            //Generate a token and send it to user.
            const token = jwt.sign({id:id,username:username},process.env.JWT_SECRET);
            return res.json({"token":token, "user":username});
        }

        return res.status(401).json({ message: "Invalid password" });

    }
)

//Signup Login for existing users.
router.post("/signup",async(req,res,next)=>{

    //Extract the email and password from the FORM body.
    let {username,email,password} = req.body;
    
    //Check if the user with current credentials already exists.
    const existingUser = await pool.query(`SELECT * FROM users WHERE username=$1 OR email=$2`,[username,email]);

    if(existingUser.rows[0] != null) 
        return res.json({ message: `User with ${username} already exists, Please try a different username` });

    //If not save the new user to database.
    const hashedPassword = await generateHashedPassword(password);

    await pool.query(`INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3)`,[username,email,hashedPassword]);

    res.json({message:"User Added Succesfully"});

})

export default router;