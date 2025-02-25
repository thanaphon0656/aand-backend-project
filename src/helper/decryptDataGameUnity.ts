const CryptoJS = require('crypto-js');

const DecryptDataGameUnity = (hash: string): any => {
  const key = CryptoJS.enc.Utf8.parse(process.env.GAME_PRIVATE_KEY_UNITY);
  const iv = CryptoJS.enc.Utf8.parse(process.env.GAME_IV_KEY_UNITY);

  const decrypt = CryptoJS.AES.decrypt(hash, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedStr);
};

export default DecryptDataGameUnity;
