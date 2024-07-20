export default () => {
  const {
    PORT = '3000',
    MONGO_URI,
    JWT_SECRET,
    MARVEL_API_PUBLIC_KEY,
    MARVEL_API_PRIVATE_KEY,
  } = process.env;

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  if (!MARVEL_API_PUBLIC_KEY) {
    throw new Error('MARVEL_API_PUBLIC_KEY is not defined');
  }
  if (!MARVEL_API_PRIVATE_KEY) {
    throw new Error('MARVEL_API_PRIVATE_KEY is not defined');
  }

  return {
    port: parseInt(PORT, 10),
    database: {
      uri: MONGO_URI,
    },
    jwtSecret: JWT_SECRET,
    marvelApi: {
      publicKey: MARVEL_API_PUBLIC_KEY,
      privateKey: MARVEL_API_PRIVATE_KEY,
    },
  };
};
