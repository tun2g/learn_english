import { NextFunction, Request,Response } from "express";
import { CResponse } from "../vendors/IHttp";
import UserSchema from "../models/user.m";
import ErrorMessages from "../vendors/errorMessages";
import Jwt from "../utils/jwt";
import { RoleAuth,RoleExpiredTimeToken,RoleToken } from "../vendors/roles";

export default class AuthController{

    static async register(req:Request,res:Response,next:NextFunction){
        try {
            const user =  req.body;
            console.log(req.body);

            const hasUser = await UserSchema.findOne({
                "$or": [
                    {"email": user.email},
                    {"username": user.username}
                ]
            })

            if (hasUser){
                return CResponse.badRequest(res,ErrorMessages.USER_IS_EXISTED);
            }
            
            const newUser = new UserSchema(user);
            await newUser.save();
            

            const accessToken = await Jwt.generateToken(newUser._id,RoleAuth.USER,RoleToken.ACCESS_TOKEN,RoleExpiredTimeToken.ACCESS_TOKEN);
            const refreshToken = await Jwt.generateToken(newUser._id,RoleAuth.USER,RoleToken.REFRESH_TOKEN,RoleExpiredTimeToken.REFRESH_TOKEN);

            res.cookie("refreshtoken", refreshToken,{
                path: "/",
                maxAge:1000*RoleExpiredTimeToken.REFRESH_TOKEN,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            return CResponse.created(res,{
                'user': {
                    "username": user.username,
                    "email": user.email,
                    "avatar": user.avatar,
                },
                "accessToken": accessToken
            })
        

        } catch (error:any) {
            console.log(error);
            return CResponse.badRequest(res, error);    
        }
    }

    static async login(req:Request, res:Response) {
        try {
            const {username,password} = req.body;

            const hasUser = await UserSchema.findOne({"username": username})
            if (!hasUser){
                return CResponse.badRequest(res,ErrorMessages.LOGIN_FAILED);
            }
            
            const isRightPassword = await hasUser.isRightPassword(password);
            if (!isRightPassword) {
                return CResponse.badRequest(res,ErrorMessages.LOGIN_FAILED);
            }

            const accessToken = await Jwt.generateToken(hasUser._id,RoleAuth.USER,RoleToken.ACCESS_TOKEN,RoleExpiredTimeToken.ACCESS_TOKEN);
            const refreshToken = await Jwt.generateToken(hasUser._id,RoleAuth.USER,RoleToken.REFRESH_TOKEN,RoleExpiredTimeToken.REFRESH_TOKEN);

            res.cookie("refreshtoken", refreshToken,{
                path: "/",
                maxAge:1000*RoleExpiredTimeToken.REFRESH_TOKEN,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            return CResponse.success(res,{
                'user': {
                    "username": hasUser.username,
                    "email": hasUser.email,
                    "avatar": hasUser.avatar,
                },
                "accessToken": accessToken
            })
            

        } catch (error:any) {
            console.log(error);
            return CResponse.badRequest(res, error);
        }
    }
}