export type AuthJwtPayload = {
    sub: string; // subject, data encrypted in the JWT, IN THIS CASE THE USER ID
    // email: string;
    // roles: string[];
    // iat: number; // issued at
    // exp: number; // expiration time
};