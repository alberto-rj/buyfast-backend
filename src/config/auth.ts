// JWT
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
export const JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES = Number(
  process.env.JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES as string,
);

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
export const JWT_REFRESH_SECRET_EXPIRES_IN_DAYS = Number(
  process.env.JWT_REFRESH_SECRET_EXPIRES_IN_DAYS as string,
);

// BCRYPT SALT
export const BCRYPT_SALT_ROUNDS = Number(
  process.env.BCRYPT_SALT_ROUNDS as string,
);
