import DecryptDataGameUnity from './../helper/decryptDataGameUnity';
import { HttpException } from './../exceptions/HttpException';

const decryptMiddleware = (req, res, next) => {
  const encryptedData = req.body.data;

  if (encryptedData === null) next(new HttpException(400, `Validation error: \"data\" is not allowed to be null`));
  if (encryptedData === '') next(new HttpException(400, `Validation error: \"data\" is not allowed to be empty`));

  if (!encryptedData) next(new HttpException(404, 'Validation error: "data" is required'));

  try {
    const decryptedData = DecryptDataGameUnity(encryptedData);
    if (!decryptedData) {
      return next(new HttpException(400, 'Invalid decrypted data'));
    }

    req.body = decryptedData;

    next();
  } catch (error) {
    console.log('error', error);

    next(new HttpException(401, 'Decryption failed'));
  }
};

export default decryptMiddleware;
