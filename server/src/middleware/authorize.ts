import { Request,Response,NextFunction } from "express";
import { CResponse } from "../vendors/IHttp";
import ErrorMessages from "../vendors/errorMessages";
import Jwt from "../utils/jwt";
import { RoleAuth,RoleToken } from "../vendors/roles";

export default function authorize() {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                return CResponse.forbidden(res)
            }
            const accessToken = authHeader.split(' ')[1]
            const userId = req.body.userId;
            const isAuthenticated = await Jwt.verifyToken(userId,accessToken,RoleAuth.USER,RoleToken.ACCESS_TOKEN)        
            
            if (isAuthenticated)
            {
                next();
            } 
            else {
                return CResponse.forbidden(res)
            }
            
        } catch (error) {
            console.log(error);
            return CResponse.forbidden(res)
        }
    };
}