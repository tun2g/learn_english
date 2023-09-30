import dotenv from 'dotenv';
dotenv.config()

class Config {
    public DB_URI = process.env.DB_URI 
    public PORT = process.env.PORT
    public KEY_AUTH = process.env.KEY_AUTH 
    public KEY_JWT_SECRET = process.env.KEY_JWT_SECRET
}

const envConfig = new Config();

export default envConfig