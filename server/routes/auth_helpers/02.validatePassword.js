import bcrypt from 'bcrypt';

async function validatePassword(plainPassword, storedHash){
    
    const isValid = await bcrypt.compare(plainPassword,storedHash);
    return isValid;
}

export {validatePassword}