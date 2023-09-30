import {Response,Request} from "express"
import { CResponse } from "../vendors/IHttp"
import ErrorMessages from "../vendors/errorMessages";
import VocabSchema from "../models/vocab.m"

export default class VocabController {

    public static async createNewVocab(req:Request, res:Response){
        try {
            const vocab = req.body;

            const hasVocab = await VocabSchema.findOne({"eng":vocab.eng,"userId": vocab.creater});

            if (hasVocab){
                return CResponse.badRequest(res, ErrorMessages.VOCAB_IS_EXISTED);
            }

            const newVocab = new VocabSchema(vocab);
            await newVocab.save();

            return CResponse.created(res,{ "vocab": newVocab}); 

        } catch (error:any) {
            const errorMsg = error.message;
            return CResponse.badRequest(res, errorMsg);
        }
    }

    public static async updateVocab(req:Request,res:Response){
        try {
            const vocab  = req.body;
            console.log(vocab)
            let hasVocab = await VocabSchema.findOneAndUpdate(
                {
                    "eng":vocab.eng,
                    "userId": vocab.userId
                },
                {
                    "eng": vocab.eng,
                    "vnese": vocab.vnese,
                    "examples": vocab.examples,
                    "type": vocab.type,
                    "synonyms": vocab.synonyms
                },
                {
                    new:true
                }
            );

            if (!hasVocab){
                return CResponse.badRequest(res, ErrorMessages.VOCAB_IS_NOT_EXIST);
            }

            return CResponse.success(res, hasVocab); 

        } catch (error:any) {
            const errorMsg = error.message;
            return CResponse.badRequest(res, errorMsg);
        }
    }
}
