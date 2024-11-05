import * as Crypto from 'crypto-js';
import { envs } from 'src/config';
// import * as crypto from 'crypto';

const secretKey =envs.encryptionSecretKey
export const encryption = (password: string): string =>{
    const encryptedPassword: string = Crypto.AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
}

export const decryption = (encryptedPassword: string): string =>{
    const bytes = Crypto.AES.decrypt(encryptedPassword, secretKey);
    const decryptedPassword = bytes.toString(Crypto.enc.Utf8);
    return decryptedPassword;
}

export function comparePassword (password: string, encryptedPassword: string): boolean {
    const decryptedPassword = decryption(encryptedPassword);
    console.log('pasword', password);
    console.log('encryptedPassword', encryptedPassword);
    console.log('decryptedPassword', decryptedPassword);
    return password === decryptedPassword;
}

// export const generateotp = () =>{
//     const otp = crypto.randomInt(100000, 999999);
//     return otp;
// }