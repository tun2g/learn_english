import { Request,Response,NextFunction } from "express";
import { CResponse } from "../vendors/IHttp";
import ErrorMessages from "../vendors/errorMessages";

export default function validateEntity(schema:any) {
    return (req:Request, res:Response, next:NextFunction) => {
      const data = req.body;
      const { error } = schema.validate(data);

      if (error) {
        console.log(error);
        return CResponse.badRequest(res, ErrorMessages.INVALID_REQUEST);
      }

      next(); 
    };
}