import {Response} from "express";

export class CResponse{
    
    public static success(res:Response,data:any=null){
        return res.json({
            "msg": "success",
            "data": data
        })
    }

    public static created(res:Response,data:any){
        return res.status(201).json({
            "msg": "created",
            "data": data
        })
    }

    public static badRequest(res:Response,error:String,data :any=null){
        return res.status(400).json({
            "errors": error,
            "data": data
        })
    }

    public static unauthorized(res:Response){
        return res.status(401).json({
            "errors": "Unauthorized!"
        })
    }

    public static forbidden(res:Response){
        return res.status(403).json({
            "errors": "Forbidden!"
        })
    }
};


