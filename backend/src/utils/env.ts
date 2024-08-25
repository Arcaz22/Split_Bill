import dotenv from 'dotenv';

dotenv.config();

function getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
}

export const env = {
    BASE_URL: getEnvVariable('BASE_URL'),
};
