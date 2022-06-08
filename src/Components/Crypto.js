var CryptoJS = require("crypto-js");

// var data = [{id: 1}, {id: 2}]

// Encrypt
export const ciphertext=(data) =>{
    console.log(data,"JSON.stringify(data)")
   return CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
} 

// Decrypt
export const  decryptedData=(txt)=>{
    var bytes  = CryptoJS.AES.decrypt(txt, 'secret key 123');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
