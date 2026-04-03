import bcrypt from 'bcrypt'
import 'dotenv/config'

const saltRounds = Number(process.env.SALT_ROUNDS);

async function generateHashedPassword(password){

    const hash = await bcrypt.hash(password,saltRounds);
    return hash;

}

export {generateHashedPassword}

// console.log("Generated Hash")
const hashedPassword = await generateHashedPassword("Bhargav")
// console.log(hashedPassword);