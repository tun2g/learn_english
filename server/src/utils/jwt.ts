import JWT from "jsonwebtoken";
import envConfig from "../envConfig";
import Redis from "../configs/ioredis";

export default class Jwt {
    public static async  generateToken(userId:any,roleAuth:any,roleToken:any,time: number = 1800): Promise<String>{
        try {
            const payload = 
            {
                sub: userId, 
                iat: Math.floor(Date.now() / 1000), 
                exp: Math.floor(Date.now() / 1000) + time,
            }
            const keySecret : string = `${envConfig.KEY_JWT_SECRET}:${userId}` !; 
            
            const token =  JWT.sign(payload,keySecret,{algorithm:'HS256'});
            
            const data = {
                '_id': userId,
                'roleAuth': roleAuth,
                'roleToken': roleToken
            };
            
            const keyRedis = `${envConfig.KEY_AUTH}:${token}`;

            // store role in redis database
            await Redis.setex(keyRedis,time,JSON.stringify(data));

            return token;
        } catch (error:any) {
            return "";
        }
    }

    
    public static async verifyToken(userId:any,token:string,roleAuth:string,roleToken:string):Promise<boolean>{
        try {
            const keyRedis = `${envConfig.KEY_AUTH}:${token}`;
            let data : any = await Redis.get(keyRedis);
            if (!data){
                return false;
            }

            data = JSON.parse(data);
            if(roleToken !== data.roleToken || roleAuth !== data.roleAuth){
                return false;
            }

            const keySecret : string = `${envConfig.KEY_JWT_SECRET}:${userId}` !; 
            const verifyJwt = JWT.verify(token,keySecret);
            if (verifyJwt['sub'] !== userId) {
                return false;
            }

            return true; 
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
