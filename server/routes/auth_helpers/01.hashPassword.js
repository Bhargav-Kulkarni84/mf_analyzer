import bcrypt from 'bcrypt'
import 'dotenv/config'

const saltRounds = Number(process.env.SALT_ROUNDS);

async function generateHashedPassword(password){

    const hash = await bcrypt.hash(password,saltRounds);
    console.log("Hash",hash);
    return hash;

}

export {generateHashedPassword}
