const crypto = require("crypto");

const generateKeyUnity = (): { privateKey: string; ivKey: string } => {
  function generateKey(length = 16) {
    return crypto.randomBytes(length).toString("hex").slice(0, length); // ใช้ `hex` แทน `base64`
  }

  const privateKey = generateKey(16);
  const ivKey = generateKey(16);

  console.log(`GAME_PRIVATE_KEY_UNITY=${privateKey}`);
  console.log(`GAME_IV_KEY_UNITY=${ivKey}`);

  return { privateKey, ivKey };
};

export default generateKeyUnity;
