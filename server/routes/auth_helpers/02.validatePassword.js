import bcrypt from 'bcrypt';

async function validatePassword(plainPassword, storedHash){
    
    const isValid = bcrypt.compare(plainPassword,storedHash);
    return isValid;
}

export {validatePassword}