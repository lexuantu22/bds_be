export declare class User {
    id: string;
    username: string;
    passwordHash: string;
    hashedRefreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}
